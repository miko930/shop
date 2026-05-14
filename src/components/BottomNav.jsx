import { IconHome, IconShoppingCart, IconClipboardList, IconUser } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  { key: '/', label: 'Home', icon: IconHome },
  { key: '/cart', label: 'Cart', icon: IconShoppingCart },
  { key: '/orders', label: 'Orders', icon: IconClipboardList },
  { key: '/profile', label: 'Profile', icon: IconUser },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40,
      backgroundColor: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      borderTop: '1px solid #eee',
    }}>
      <div style={{ display: 'flex' }}>
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.key;
          return (
            <button
              key={item.key}
              onClick={() => navigate(item.key)}
              style={{
                display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', gap: 4, padding: '14px 0',
                color: isActive ? '#1a3a6b' : '#888',
                background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                position: 'relative',
              }}
            >
              {isActive && (
                <div style={{
                  position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                  width: 32, height: 3, borderRadius: 2, backgroundColor: '#d4a437',
                }} />
              )}
              <item.icon size={24} stroke={isActive ? 2 : 1.5} />
              <span style={{ fontSize: 11, fontWeight: 600 }}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
