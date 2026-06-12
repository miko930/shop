import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useFavorites } from '../context/FavoritesContext';

export default function ProductCard({ product, onClick }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(product.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  const hasDiscount = product.old_price && product.old_price > product.price;

  return (
    <div
      onClick={() => onClick(product)}
      style={{
        background: 'var(--color-store-card)',
        border: '1px solid var(--color-store-border)',
        borderRadius: '14px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.2s, transform 0.15s',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-gold-dim)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-store-border)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Category Badge */}
      <div style={{
        position: 'absolute',
        top: '8px',
        left: '8px',
        background: 'rgba(10, 10, 10, 0.85)',
        border: '1px solid var(--color-gold-dim)',
        color: 'var(--color-gold)',
        fontSize: '9px',
        letterSpacing: '0.1em',
        padding: '3px 8px',
        borderRadius: '4px',
        textTransform: 'uppercase',
        backdropFilter: 'blur(4px)',
        zIndex: 5,
      }}>
        {product.category}
      </div>

      {/* Sale Badge */}
      {hasDiscount && (
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'var(--color-gold)',
          color: 'var(--color-black)',
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '0.05em',
          padding: '3px 7px',
          borderRadius: '4px',
          zIndex: 5,
        }}>
          SALE
        </div>
      )}

      {/* Favorite Button (Bottom Right of Image Area) */}
      <button
        onClick={handleFavoriteClick}
        style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          zIndex: 10,
          display: 'flex',
          height: '30px',
          width: '30px',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: 'rgba(10, 10, 10, 0.75)',
          backdropFilter: 'blur(4px)',
          color: favorited ? 'var(--color-gold)' : 'rgba(245, 240, 232, 0.6)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        aria-label="Toggle Favorite"
      >
        {favorited ? (
          <IconHeartFilled size={16} />
        ) : (
          <IconHeart size={16} stroke={1.8} />
        )}
      </button>

      {/* Image Area */}
      <div style={{ width: '100%', aspectRatio: '1', position: 'relative', overflow: 'hidden', background: '#1a1a1a' }}>
        {product.image_url ? (
          <LazyLoadImage
            src={product.image_url}
            alt={product.name}
            effect="blur"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            wrapperStyle={{ display: 'block', height: '100%', width: '100%' }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #222 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-serif)',
            fontSize: '32px',
            color: 'var(--color-gold-dim)',
          }}>
            {product.emoji || '✦'}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div style={{ padding: '12px' }}>
        <p style={{
          fontSize: '9px',
          letterSpacing: '0.2em',
          color: 'var(--color-gold-dim)',
          textTransform: 'uppercase',
          marginBottom: '3px',
        }}>
          {product.brand || 'TAMADDISS'}
        </p>
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '15px',
          fontWeight: 600,
          lineHeight: 1.2,
          color: 'var(--color-white)',
          marginBottom: '6px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          minHeight: '36px',
        }}>
          {product.name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-gold)' }}>
            ETB {product.price?.toLocaleString()}
          </span>
          {hasDiscount && (
            <span style={{ fontSize: '11px', color: 'var(--color-muted)', textDecoration: 'line-through' }}>
              ETB {product.old_price?.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
