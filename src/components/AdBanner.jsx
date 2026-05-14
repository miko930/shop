import { useState, useEffect, useRef } from 'react';
import { IconX, IconBrandTelegram, IconPhoneCall } from '@tabler/icons-react';
import { useBanners } from '../hooks/useBanners';

const FALLBACK_BANNERS = [
  { id: 1, title: 'ይህ ቦታ', subtitle: 'ለማስታወቂያ ክፍት ነው!', description: 'ምርት እና አገልግሎትን ያስተዋውቁ', cta_text: '0911675921', bg_color: '#1a3a6b', emoji: '📢' },
  { id: 2, title: 'TAMADDISS', subtitle: 'ምርጥ ምርቶች በተመጣጣኝ ዋጋ!', description: 'ኤሌክትሮኒክስ፣ የቤት ዕቃዎች እና ሌሎችም', cta_text: '0911675921', bg_color: '#0a1628', emoji: '🛍️' },
];

const TELEGRAM_LINK = 'https://t.me/gumerwatch1';

export default function AdBanner() {
  const { banners: dbBanners } = useBanners();
  const banners = dbBanners.length > 0 ? dbBanners.filter(b => b.is_active !== false) : FALLBACK_BANNERS;
  const [current, setCurrent] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupBanner, setPopupBanner] = useState(null);
  const intervalRef = useRef(null);

  const startAutoPlay = () => {
    clearInterval(intervalRef.current);
    if (banners.length > 1) {
      intervalRef.current = setInterval(() => setCurrent(p => (p + 1) % banners.length), 4000);
    }
  };

  useEffect(() => { startAutoPlay(); return () => clearInterval(intervalRef.current); }, [banners.length]);

  const goTo = (i) => { setCurrent(i); startAutoPlay(); };

  const handleBannerTap = (banner) => {
    setPopupBanner(banner);
    setPopupOpen(true);
    clearInterval(intervalRef.current);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setPopupBanner(null);
    startAutoPlay();
  };

  // Extract phone number from cta_text (e.g. "በ0911675921 ይደውሉ" → "0911675921")
  const extractPhone = (text) => {
    if (!text) return '0911675921';
    const match = text.match(/[\d+]+/);
    return match ? match[0] : text;
  };

  if (banners.length === 0) return null;
  const b = banners[current % banners.length];

  return (
    <div>
      {/* Banner */}
      <div
        onClick={() => handleBannerTap(b)}
        style={{
          position: 'relative', overflow: 'hidden', borderRadius: 20, cursor: 'pointer',
          background: b.image_url ? `url(${b.image_url}) center/cover` : `linear-gradient(135deg, ${b.bg_color || '#1a3a6b'}, ${b.bg_color ? b.bg_color + 'cc' : '#2a5298'})`,
          padding: b.image_url ? 0 : '20px', color: '#fff',
          boxShadow: '0 4px 20px rgba(26,58,107,0.15)', transition: 'all 0.5s',
          minHeight: 140,
        }}
      >
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

      {/* Dots */}
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

      {/* Contact Popup */}
      {popupOpen && popupBanner && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          {/* Backdrop */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} onClick={closePopup} />

          {/* Bottom Sheet */}
          <div style={{
            position: 'relative', width: '100%', maxWidth: 480,
            backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28,
            padding: '20px 24px 36px', boxShadow: '0 -8px 32px rgba(0,0,0,0.12)',
            animation: 'slideUp 0.3s ease-out',
          }}>
            {/* Handle */}
            <div style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: '#ddd', margin: '0 auto 16px' }} />

            {/* Close */}
            <button onClick={closePopup} style={{
              position: 'absolute', top: 16, right: 16,
              display: 'flex', height: 32, width: 32, alignItems: 'center', justifyContent: 'center',
              borderRadius: '50%', border: 'none', backgroundColor: '#f0f1f3', cursor: 'pointer',
            }}>
              <IconX size={16} style={{ color: '#666' }} />
            </button>

            {/* Banner title */}
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0a1628', marginBottom: 4 }}>
              {popupBanner.title || 'Contact Us'}
            </h3>
            {popupBanner.subtitle && (
              <p style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>{popupBanner.subtitle}</p>
            )}

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Telegram */}
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  padding: '16px 0', borderRadius: 16, border: 'none', cursor: 'pointer',
                  backgroundColor: '#0088cc', color: '#fff',
                  fontSize: 15, fontWeight: 700, textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(0,136,204,0.3)',
                  transition: 'transform 0.15s',
                }}
              >
                <IconBrandTelegram size={22} />
                Telegram
              </a>

              {/* Call Us */}
              <a
                href={`tel:+251${extractPhone(popupBanner.cta_text).replace(/^0/, '')}`}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  padding: '16px 0', borderRadius: 16, border: 'none', cursor: 'pointer',
                  backgroundColor: '#1a3a6b', color: '#fff',
                  fontSize: 15, fontWeight: 700, textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(26,58,107,0.3)',
                  transition: 'transform 0.15s',
                }}
              >
                <IconPhoneCall size={22} />
                Call Us — {extractPhone(popupBanner.cta_text)}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Slide-up animation */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
