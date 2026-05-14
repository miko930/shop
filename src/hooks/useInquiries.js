import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*, products(name)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const createInquiry = async (inquiryData) => {
    const { data, error } = await supabase
      .from('inquiries')
      .insert([inquiryData])
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const markHandled = async (id) => {
    const { data, error } = await supabase
      .from('inquiries')
      .update({ is_handled: true })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? data : i))
    );
    return data;
  };

  return {
    inquiries,
    loading,
    refetch: fetchInquiries,
    createInquiry,
    markHandled,
  };
}
