import { IconX, IconHeartOff } from '@tabler/icons-react';
import ProductCard from './ProductCard';
import { useFavorites } from '../context/FavoritesContext';

export default function FavoritesModal({ isOpen, onClose, onProductClick }) {
  const { favorites } = useFavorites();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(6px)',
        }}
      />

      {/* Sheet */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 201,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '480px',
          maxHeight: '90vh',
          borderRadius: '24px 24px 0 0',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-store-border)',
          animation: 'var(--animate-slide-up)',
        }}
      >
        {/* Drag Handle Decoration */}
        <div style={{
          width: '36px',
          height: '4px',
          background: 'var(--color-store-border)',
          borderRadius: '2px',
          margin: '12px auto 0',
        }} />

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '1px solid var(--color-store-border)',
            background: 'var(--color-surface)',
            color: 'var(--color-muted)',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-white)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-muted)'}
          aria-label="Close favorites"
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ padding: '32px 24px 16px', borderBottom: '1px solid var(--color-store-border)' }}>
          <h2 style={{ fontSize: 24, fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--color-white)' }}>My Favorites</h2>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 32px' }}>
          {favorites.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 0', color: 'var(--color-muted)' }}>
              <IconHeartOff size={48} style={{ marginBottom: 12, opacity: 0.5 }} />
              <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-white)', fontFamily: 'var(--font-serif)' }}>No favorites yet</p>
              <p style={{ fontSize: 13, marginTop: 4 }}>Products you like will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
