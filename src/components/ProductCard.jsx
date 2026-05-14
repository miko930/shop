import { IconHeart, IconShoppingCart } from '@tabler/icons-react';

export default function ProductCard({ product, onClick }) {
  return (
    <div
      onClick={() => onClick(product)}
      style={{
        cursor: 'pointer', overflow: 'hidden', borderRadius: 20,
        backgroundColor: '#f4f5f7', padding: 10,
        transition: 'all 0.2s',
      }}
    >
      {/* Image area */}
      <div style={{
        position: 'relative', borderRadius: 16, overflow: 'hidden',
        height: 150, backgroundColor: '#fff',
      }}>
        {/* Heart button */}
        <button
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute', top: 8, right: 8, zIndex: 10,
            display: 'flex', height: 34, width: 34, alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%', border: 'none', cursor: 'pointer',
            backgroundColor: 'rgba(255,255,255,0.9)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <IconHeart size={18} style={{ color: '#bbb' }} stroke={1.5} />
        </button>

        {product.image_url ? (
          <img src={product.image_url} alt={product.name} style={{ height: '100%', width: '100%', objectFit: 'cover' }} loading="lazy" />
        ) : (
          <div style={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
            {product.emoji || '📦'}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '12px 4px 4px' }}>
        <h3 style={{
          fontSize: 13, fontWeight: 600, color: '#1a1a2e', lineHeight: 1.4,
          overflow: 'hidden', textOverflow: 'ellipsis',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          minHeight: 36, marginBottom: 8,
        }}>
          {product.name}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e' }}>
            {product.price?.toLocaleString()} Br
          </span>
          <button
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex', height: 36, width: 36, alignItems: 'center', justifyContent: 'center',
              borderRadius: 12, border: 'none', cursor: 'pointer',
              backgroundColor: '#e8f0fe', color: '#1a3a6b',
            }}
          >
            <IconShoppingCart size={18} stroke={1.8} />
          </button>
        </div>
      </div>
    </div>
  );
}
