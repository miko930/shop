import { IconX, IconHeartOff } from '@tabler/icons-react';
import ProductCard from './ProductCard';
import { useFavorites } from '../context/FavoritesContext';

export default function FavoritesModal({ isOpen, onClose, onProductClick }) {
  const { favorites } = useFavorites();

  if (!isOpen) return null;

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 60, display: 'flex', maxHeight: '90vh', flexDirection: 'column',
        borderTopLeftRadius: 32, borderTopRightRadius: 32, backgroundColor: '#fff',
        animation: 'slideUp 0.3s ease-out'
      }}>
        <div style={{ position: 'absolute', left: '50%', top: 12, height: 6, width: 48, transform: 'translateX(-50%)', borderRadius: 3, backgroundColor: '#e0e0e0' }} />
        <button onClick={onClose} style={{ position: 'absolute', right: 16, top: 16, zIndex: 10, display: 'flex', height: 32, width: 32, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: 'none', backgroundColor: '#f0f1f3', cursor: 'pointer' }}>
          <IconX size={18} style={{ color: '#0a1628' }} />
        </button>

        <div style={{ padding: '32px 24px 16px', borderBottom: '1px solid #eee' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0a1628' }}>My Favorites</h2>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 32px' }}>
          {favorites.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {favorites.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={(p) => {
                    onClose();
                    if (onProductClick) onProductClick(p);
                  }}
                />
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 0', color: '#888' }}>
              <IconHeartOff size={48} style={{ marginBottom: 12, opacity: 0.5 }} />
              <p style={{ fontSize: 16, fontWeight: 600, color: '#0a1628' }}>No favorites yet</p>
              <p style={{ fontSize: 13, marginTop: 4 }}>Products you like will appear here.</p>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
