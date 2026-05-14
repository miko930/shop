import { IconBell, IconHeart, IconMapPin } from '@tabler/icons-react';

export default function Navbar({ children }) {
  return (
    <header style={{ position: 'relative', zIndex: 50 }}>
      <div style={{
        background: 'linear-gradient(160deg, #080e1a 0%, #0f1f3d 30%, #1a3a6b 70%, #2a5298 100%)',
        borderBottomLeftRadius: 36,
        borderBottomRightRadius: 36,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 48,
        paddingBottom: 56,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: -30, width: 220, height: 220, borderRadius: '50%', background: 'rgba(212,164,55,0.06)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -20, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', filter: 'blur(30px)' }} />
        <div style={{ position: 'absolute', top: '40%', right: '20%', width: 100, height: 100, borderRadius: '50%', background: 'rgba(212,164,55,0.04)', filter: 'blur(25px)' }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 10 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 6, letterSpacing: 0.3 }}>Location</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.85)' }}>
              <IconMapPin size={17} stroke={2} />
              <span style={{ fontSize: 14, fontWeight: 500 }}>Getting your location...</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 14 }}>
            <button style={{
              display: 'flex', height: 48, width: 48, alignItems: 'center', justifyContent: 'center',
              borderRadius: '50%', border: '1.5px solid rgba(212,164,55,0.3)',
              background: 'rgba(255,255,255,0.08)', color: '#fff', cursor: 'pointer',
              backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            }}>
              <IconBell size={22} stroke={1.5} />
            </button>
            <button style={{
              display: 'flex', height: 48, width: 48, alignItems: 'center', justifyContent: 'center',
              borderRadius: '50%', border: '1.5px solid rgba(212,164,55,0.3)',
              background: 'rgba(255,255,255,0.08)', color: '#fff', cursor: 'pointer',
              backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            }}>
              <IconHeart size={22} stroke={1.5} />
            </button>
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 20, marginTop: -28, paddingLeft: 20, paddingRight: 20 }}>
        {children}
      </div>
    </header>
  );
}
