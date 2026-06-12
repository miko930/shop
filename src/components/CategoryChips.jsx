export default function CategoryChips({ categories, activeCategory, onSelect }) {
  const allCategories = [{ id: 'all', name: 'All', slug: 'all' }, ...categories];

  return (
    <div
      className="hide-scrollbar"
      style={{
        display: 'flex',
        gap: '8px',
        padding: '16px 20px',
        overflowX: 'auto',
        borderBottom: '1px solid var(--color-store-border)',
      }}
    >
      {allCategories.map((cat) => {
        const isActive = activeCategory === cat.slug;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.slug)}
            style={{
              flexShrink: 0,
              padding: '7px 16px',
              borderRadius: '20px',
              border: isActive ? '1px solid var(--color-gold)' : '1px solid var(--color-store-border)',
              background: isActive ? 'rgba(201,168,76,0.08)' : 'transparent',
              color: isActive ? 'var(--color-gold)' : 'var(--color-muted)',
              fontSize: '12px',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = 'var(--color-gold)';
                e.currentTarget.style.color = 'var(--color-gold)';
                e.currentTarget.style.background = 'rgba(201,168,76,0.08)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = 'var(--color-store-border)';
                e.currentTarget.style.color = 'var(--color-muted)';
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
