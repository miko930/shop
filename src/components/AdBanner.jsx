import { useState, useEffect, useRef } from 'react';
import { useBanners } from '../hooks/useBanners';

const FALLBACK_BANNERS = [
  { id: 1, title: 'ይህ ቦታ', subtitle: 'ለማስታወቂያ ክፍት ነው!', description: 'ምርት እና አገልግሎትን ያስተዋውቁ', cta_text: 'በ0911675921 ይደውሉ', bg_color: '#1a3a6b', emoji: '📢' },
  { id: 2, title: 'TAMADDISS', subtitle: 'ምርጥ ምርቶች በተመጣጣኝ ዋጋ!', description: 'ኤሌክትሮኒክስ፣ የቤት ዕቃዎች እና ሌሎችም', cta_text: 'በ0911675921 ይደውሉ', bg_color: '#0a1628', emoji: '🛍️' },
];

export default function AdBanner() {
  const { banners: dbBanners } = useBanners();
  const banners = dbBanners.length > 0 ? dbBanners.filter(b => b.is_active !== false) : FALLBACK_BANNERS;
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const startAutoPlay = () => {
    clearInterval(intervalRef.current);
    if (banners.length > 1) {
      intervalRef.current = setInterval(() => setCurrent(p => (p + 1) % banners.length), 4000);
    }
  };

  useEffect(() => { startAutoPlay(); return () => clearInterval(intervalRef.current); }, [banners.length]);

  const goTo = (i) => { setCurrent(i); startAutoPlay(); };

  if (banners.length === 0) return null;
  const b = banners[current % banners.length];

  return (
    <div>
      <div style={{
        position: 'relative', overflow: 'hidden', borderRadius: 20,
        background: b.image_url ? `url(${b.image_url}) center/cover` : `linear-gradient(135deg, ${b.bg_color || '#1a3a6b'}, ${b.bg_color ? b.bg_color + 'cc' : '#2a5298'})`,
        padding: b.image_url ? 0 : '20px', color: '#fff',
        boxShadow: '0 4px 20px rgba(26,58,107,0.15)', transition: 'all 0.5s',
        minHeight: 140,
      }}>
        {b.image_url ? (
          <img src={b.image_url} alt={b.title || ''} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block', borderRadius: 20 }} />
        ) : (
          <>
            <div style={{ position: 'absolute', top: -24, right: -24, width: 96, height: 96, borderRadius: '50%', background: 'rgba(212,164,55,0.1)' }} />
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ flex: 1 }}>
                {b.title && <div style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.2 }}>{b.title}</div>}
                {b.subtitle && <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.9, marginTop: 2 }}>{b.subtitle}</div>}
                {b.description && <div style={{ fontSize: 11, opacity: 0.65, marginTop: 4 }}>{b.description}</div>}
                {b.cta_text && <div style={{ fontSize: 12, fontWeight: 700, color: '#d4a437', marginTop: 8 }}>{b.cta_text}</div>}
              </div>
              {b.emoji && <div style={{ fontSize: 48 }}>{b.emoji}</div>}
            </div>
          </>
        )}
      </div>

      {banners.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>
          {banners.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: i === current ? 20 : 6, height: 6, borderRadius: 3, border: 'none', cursor: 'pointer',
              background: i === current ? '#1a3a6b' : '#d4d4d4', transition: 'all 0.3s',
            }} />
          ))}
        </div>
      )}
    </div>
  );
}
