import { IconX, IconPhoneCall } from '@tabler/icons-react';

export default function PhonePopup({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)' }} onClick={onClose} />
      <div style={{ position: 'relative', width: '100%', maxWidth: 360, borderRadius: 32, padding: 24, backgroundColor: '#fff', boxShadow: '0 24px 48px rgba(0,0,0,0.15)' }}>
        <button onClick={onClose} style={{ position: 'absolute', right: 16, top: 16, display: 'flex', height: 32, width: 32, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: 'none', cursor: 'pointer', backgroundColor: '#f0f1f3', color: '#888' }}>
          <IconX size={18} />
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ marginBottom: 20, display: 'flex', height: 80, width: 80, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: '#eef1f8', color: '#1a3a6b' }}>
            <IconPhoneCall size={40} />
          </div>
          <h3 style={{ marginBottom: 8, fontSize: 20, fontWeight: 800, color: '#0a1628' }}>Call to Order</h3>
          <p style={{ marginBottom: 24, fontSize: 13, lineHeight: 1.6, color: '#888' }}>Call us to place your order or ask questions.</p>
          <a href="tel:+251972140826" style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 20, padding: '16px 0', fontSize: 15, fontWeight: 700, textDecoration: 'none', backgroundColor: '#1a3a6b', color: '#fff' }}>
            <IconPhoneCall size={20} /> +251 972 140 826
          </a>
          <button onClick={onClose} style={{ marginTop: 16, fontSize: 13, fontWeight: 700, color: '#888', background: 'none', border: 'none', cursor: 'pointer' }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
