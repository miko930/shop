import { useState, useEffect } from 'react';
import { IconX } from '@tabler/icons-react';
import { useInquiries } from '../hooks/useInquiries';

export default function ProductModal({ product, isOpen, onClose }) {
  const [qty, setQty] = useState(1);
  const { createInquiry } = useInquiries();

  // Reset quantity when modal opens/changes
  useEffect(() => {
    if (isOpen) {
      setQty(1);
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const hasDiscount = product.old_price && product.old_price > product.price;

  const changeQty = (delta) => {
    setQty(prev => Math.max(1, prev + delta));
  };

  const orderNow = () => {
    const total = (product.price * qty).toLocaleString();
    const msg =
      `Hello TAMADDISS! 👋\n\n` +
      `I'd like to order:\n` +
      `• ${product.brand || 'TAMADDISS'} – ${product.name}\n` +
      `• Quantity: ${qty}\n` +
      `• Total: ETB ${total}\n\n` +
      `📍 My delivery address: \n\n` +
      `Please call me back within 10 minutes to confirm. If I don't hear back, I'll call you.`;

    // Log the inquiry to Supabase for the Admin panel (fire and forget to maintain synchronous execution)
    createInquiry({
      product_id: product.id,
      customer_phone: 'WhatsApp Order',
      message: `Quantity: ${qty}, Total: ETB ${total}`,
      is_handled: false
    }).catch((err) => {
      console.error('Failed to log inquiry to Supabase:', err);
    });

    const url = `https://wa.me/251972140826?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <>
      {/* Modal Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      />

      {/* Modal Sheet */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 201,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-store-border)',
          borderRadius: '24px 24px 0 0',
          width: '100%',
          maxWidth: '480px',
          maxHeight: '90vh',
          overflowY: 'auto',
          paddingBottom: '32px',
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
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Image Area */}
        <div style={{ position: 'relative', width: '100%', maxHeight: '280px', background: '#1a1a1a', overflow: 'hidden' }}>
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              style={{ width: '100%', maxHeight: '280px', objectFit: 'contain', display: 'block' }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '220px',
              background: 'linear-gradient(135deg, #1a1a1a, #222)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-serif)',
              fontSize: '56px',
              color: 'var(--color-gold-dim)',
            }}>
              {product.emoji || '✦'}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px 20px 0' }}>
          <p style={{
            fontSize: '10px',
            letterSpacing: '0.25em',
            color: 'var(--color-gold-dim)',
            textTransform: 'uppercase',
            marginBottom: '4px',
          }}>
            {product.brand || 'TAMADDISS'}
          </p>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '28px',
            fontWeight: 600,
            color: 'var(--color-white)',
            marginBottom: '4px',
            lineHeight: 1.15,
          }}>
            {product.name}
          </h2>

          <p style={{
            fontSize: '13px',
            color: 'var(--color-muted)',
            lineHeight: 1.6,
            marginBottom: '16px',
          }}>
            {product.description || 'A great product from TAMADDISS.'}
          </p>

          {/* Pricing */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '20px' }}>
            <span style={{
              fontSize: '26px',
              fontWeight: 600,
              color: 'var(--color-gold)',
              fontFamily: 'var(--font-serif)',
            }}>
              ETB {product.price?.toLocaleString()}
            </span>
            {hasDiscount && (
              <span style={{
                fontSize: '16px',
                color: 'var(--color-muted)',
                textDecoration: 'line-through',
              }}>
                ETB {product.old_price?.toLocaleString()}
              </span>
            )}
          </div>

          {/* Specifications */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div style={{
              marginBottom: '20px',
              borderRadius: '12px',
              padding: '14px 16px',
              background: '#151515',
              border: '1px solid var(--color-store-border)',
            }}>
              <h4 style={{
                marginBottom: '10px',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--color-gold)',
              }}>
                Specifications
              </h4>
              {Object.entries(product.specs).map(([key, value]) => (
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #222',
                    paddingBottom: '6px',
                    marginBottom: '6px',
                    fontSize: '12px',
                  }}
                >
                  <span style={{ color: 'var(--color-muted)' }}>{key}</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-white)' }}>{value}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ height: '1px', background: 'var(--color-store-border)', margin: '0 0 18px' }} />

          {/* Delivery Ribbon */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(201, 168, 76, 0.07)',
            border: '1px solid var(--color-store-border)',
            borderRadius: '10px',
            padding: '10px 14px',
            marginBottom: '14px',
            fontSize: '12px',
            color: 'var(--color-gold-dim)',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13" rx="1" />
              <path d="M16 8h4l3 5v4h-7V8z" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            Fast delivery · Within Addis Ababa
          </div>

          {/* Quantity Selector */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--color-store-card)',
            border: '1px solid var(--color-store-border)',
            borderRadius: '12px',
            padding: '12px 16px',
            marginBottom: '14px',
          }}>
            <span style={{ fontSize: '13px', color: 'var(--color-white)', letterSpacing: '0.03em' }}>Quantity</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              <button
                onClick={() => changeQty(-1)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px solid var(--color-gold-dim)',
                  background: 'transparent',
                  color: 'var(--color-gold)',
                  fontSize: '18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(201,168,76,0.12)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                −
              </button>
              <span style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-white)', minWidth: '24px', textAlign: 'center' }}>
                {qty}
              </span>
              <button
                onClick={() => changeQty(1)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px solid var(--color-gold-dim)',
                  background: 'transparent',
                  color: 'var(--color-gold)',
                  fontSize: '18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(201,168,76,0.12)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                +
              </button>
            </div>
          </div>

          {/* WhatsApp Order Button */}
          <button
            onClick={orderNow}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              width: '100%',
              padding: '16px',
              backgroundColor: 'var(--color-green)',
              color: '#fff',
              border: 'none',
              borderRadius: '14px',
              fontSize: '15px',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
              letterSpacing: '0.01em',
              transition: 'filter 0.15s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.08)'}
            onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Order on WhatsApp
          </button>

          <p style={{
            textAlign: 'center',
            fontSize: '12px',
            color: 'var(--color-muted)',
            marginTop: '12px',
            lineHeight: 1.5,
          }}>
            Just type your address — we'll call you back in 10 min.
          </p>
        </div>
      </div>
    </>
  );
}
