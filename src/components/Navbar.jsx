import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useFavorites } from '../context/FavoritesContext';

export default function Navbar({ onFavoritesClick }) {
  const { favorites } = useFavorites();

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(10, 10, 10, 0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--color-store-border)',
      padding: '14px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '22px',
        fontWeight: 600,
        letterSpacing: '0.12em',
        color: 'var(--color-gold)',
        textTransform: 'uppercase',
      }}>
        TAMADDISS
        <span style={{
          color: 'var(--color-white)',
          opacity: 0.5,
          fontWeight: 400,
          fontSize: '11px',
          display: 'block',
          letterSpacing: '0.2em',
          fontFamily: 'var(--font-sans)',
          marginTop: '1px',
          textTransform: 'none',
        }}>Ethiopian Shop · Addis Ababa</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onFavoritesClick}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: favorites.length > 0 ? 'var(--color-gold)' : 'var(--color-muted)',
            transition: 'color 0.2s',
            padding: 4,
          }}
          aria-label="Favorites"
        >
          {favorites.length > 0 ? <IconHeartFilled size={20} /> : <IconHeart size={20} />}
          {favorites.length > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: 'var(--color-gold)',
              color: 'var(--color-black)',
              fontSize: '9px',
              fontWeight: 700,
              borderRadius: '50%',
              width: '14px',
              height: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {favorites.length}
            </span>
          )}
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11px',
          color: 'var(--color-gold-dim)',
          letterSpacing: '0.05em',
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--color-green)',
            boxShadow: '0 0 6px var(--color-green)',
            display: 'inline-block',
          }} />
          Open now
        </div>
      </div>
    </header>
  );
}
