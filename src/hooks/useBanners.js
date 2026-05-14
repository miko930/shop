import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useBanners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBanners = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      setBanners(data || []);
    } catch (err) {
      console.error('Error fetching banners:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBanners(); }, [fetchBanners]);

  const addBanner = async (data) => {
    const { data: d, error } = await supabase.from('banners').insert([data]).select().single();
    if (error) throw error;
    setBanners(prev => [...prev, d]);
    return d;
  };

  const updateBanner = async (id, data) => {
    const { data: d, error } = await supabase.from('banners').update(data).eq('id', id).select().single();
    if (error) throw error;
    setBanners(prev => prev.map(b => b.id === id ? d : b));
    return d;
  };

  const deleteBanner = async (id) => {
    const { error } = await supabase.from('banners').delete().eq('id', id);
    if (error) throw error;
    setBanners(prev => prev.filter(b => b.id !== id));
  };

  const uploadBannerImage = async (file) => {
    const ext = file.name.split('.').pop();
    const name = `banners/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('product-images').upload(name, file);
    if (error) throw error;
    const { data } = supabase.storage.from('product-images').getPublicUrl(name);
    return data.publicUrl;
  };

  return { banners, loading, refetch: fetchBanners, addBanner, updateBanner, deleteBanner, uploadBannerImage };
}
