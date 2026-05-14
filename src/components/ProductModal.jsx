import { IconX, IconShoppingCart, IconShieldCheck, IconTruckDelivery } from '@tabler/icons-react';

export default function ProductModal({ product, isOpen, onClose, onBuyNow }) {
  if (!isOpen || !product) return null;
  const hasDiscount = product.old_price && product.old_price > product.price;

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', opacity: isOpen ? 1 : 0 }} onClick={onClose} />
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, display: 'flex', maxHeight: '90vh', flexDirection: 'column', borderTopLeftRadius: 32, borderTopRightRadius: 32, backgroundColor: '#fff' }}>
        <div style={{ position: 'absolute', left: '50%', top: 12, height: 6, width: 48, transform: 'translateX(-50%)', borderRadius: 3, backgroundColor: '#e0e0e0' }} />
        <button onClick={onClose} style={{ position: 'absolute', right: 16, top: 16, zIndex: 10, display: 'flex', height: 32, width: 32, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: 'none', backgroundColor: '#f0f1f3', cursor: 'pointer' }}>
          <IconX size={18} style={{ color: '#0a1628' }} />
        </button>

        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 96 }}>
          <div style={{ position: 'relative', height: 260, width: '100%', backgroundColor: '#eef1f8' }}>
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', fontSize: 80 }}>{product.emoji || '📦'}</div>
            )}
          </div>

          <div style={{ padding: '24px 24px 0' }}>
            <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, backgroundColor: '#eef1f8', color: '#1a3a6b' }}>{product.category}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <IconShieldCheck size={16} style={{ color: '#d4a437' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#d4a437' }}>Verified</span>
              </div>
            </div>

            <h2 style={{ marginBottom: 8, fontSize: 24, fontWeight: 800, lineHeight: 1.2, color: '#0a1628' }}>{product.name}</h2>

            <div style={{ marginBottom: 24, display: 'flex', alignItems: 'flex-end', gap: 12 }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: '#1a3a6b' }}>ETB {product.price?.toLocaleString()}</span>
              {hasDiscount && <span style={{ marginBottom: 4, fontSize: 14, fontWeight: 600, textDecoration: 'line-through', color: '#888' }}>ETB {product.old_price?.toLocaleString()}</span>}
            </div>

            <p style={{ marginBottom: 24, fontSize: 14, lineHeight: 1.7, color: '#888' }}>{product.description || 'A great product from TAMADDISS.'}</p>

            {product.specs && Object.keys(product.specs).length > 0 && (
              <div style={{ marginBottom: 24, borderRadius: 20, padding: 16, backgroundColor: '#f8f9fa' }}>
                <h4 style={{ marginBottom: 12, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: '#0a1628' }}>Specifications</h4>
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: 8, marginBottom: 8, fontSize: 13 }}>
                    <span style={{ color: '#888' }}>{key}</span>
                    <span style={{ fontWeight: 600, color: '#0a1628' }}>{value}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, borderRadius: 20, border: '1px solid #eee', padding: 16 }}>
              <div style={{ display: 'flex', height: 40, width: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 12, backgroundColor: '#eef1f8', color: '#1a3a6b' }}>
                <IconTruckDelivery size={20} />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#0a1628' }}>Fast Delivery Available</p>
                <p style={{ fontSize: 11, color: '#888' }}>Within Addis Ababa</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: '1px solid #eee', backgroundColor: 'rgba(255,255,255,0.95)', padding: '16px 24px 32px', backdropFilter: 'blur(12px)' }}>
          <button onClick={() => { onClose(); onBuyNow(); }} style={{
            display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', gap: 8,
            borderRadius: 20, padding: '16px 0', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer',
            backgroundColor: '#1a3a6b', color: '#fff', boxShadow: '0 8px 24px rgba(26,58,107,0.3)', fontFamily: 'inherit',
          }}>
            <IconShoppingCart size={20} /> Call to Order
          </button>
        </div>
      </div>
    </>
  );
}
