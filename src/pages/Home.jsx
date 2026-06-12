import { useState, useMemo } from 'react';
import { IconSearch, IconX, IconSearchOff } from '@tabler/icons-react';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import Navbar from '../components/Navbar';
import CategoryChips from '../components/CategoryChips';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import ProductModal from '../components/ProductModal';
import FavoritesModal from '../components/FavoritesModal';

export default function Home() {
  const { products, loading } = useProducts();
  const { categories } = useCategories();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCat = activeCategory === 'all' || p.category?.toLowerCase() === activeCategory;
      const matchesSearch = !searchQuery || p.name?.toLowerCase().includes(searchQuery.toLowerCase()) || p.category?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  const specialOffers = useMemo(() => {
    return products.filter((p) => p.old_price && p.old_price > p.price);
  }, [products]);

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 40, backgroundColor: 'var(--color-black)', color: 'var(--color-white)' }}>
      {/* Sticky Header */}
      <Navbar onFavoritesClick={() => setFavoritesOpen(true)} />

      {/* Hero Section */}
      <div style={{ padding: '40px 20px 28px', textAlign: 'center', borderBottom: '1px solid var(--color-store-border)' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'var(--color-gold-dim)', textTransform: 'uppercase', marginBottom: '10px' }}>Curated for you</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '38px', fontWeight: 400, lineHeight: 1.1, color: 'var(--color-white)', marginBottom: '6px' }}>
          Luxury <em style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>Fragrances</em><br />& Beauty
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--color-muted)', letterSpacing: '0.03em' }}>Fast delivery within Addis Ababa</p>
      </div>

      {/* Search Input below header */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          borderRadius: 22, padding: '14px 20px',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-store-border)',
          transition: 'border-color 0.2s',
        }}>
          <IconSearch size={22} style={{ color: 'var(--color-muted)', flexShrink: 0 }} stroke={1.8} />
          <input
            type="text"
            placeholder="Search Products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%', background: 'transparent', fontSize: 15,
              fontWeight: 500, outline: 'none', border: 'none',
              color: 'var(--color-white)', fontFamily: 'inherit',
            }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{ color: 'var(--color-muted)', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
              <IconX size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Categories / Filters */}
      <section style={{ marginTop: 24 }}>
        <CategoryChips
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      </section>

      {/* Special Offers (Horizontal scroll row) */}
      {specialOffers.length > 0 && (
        <section style={{
          marginTop: 24, paddingTop: 24, paddingBottom: 28,
          backgroundColor: 'rgba(201,168,76,0.03)',
          borderTop: '1px solid var(--color-store-border)',
          borderBottom: '1px solid var(--color-store-border)',
        }}>
          <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20 }}>
            <h2 style={{ fontSize: 18, fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--color-white)', letterSpacing: 0.2 }}>Special Offers</h2>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-gold)' }}>
              {specialOffers.length} offer{specialOffers.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="hide-scrollbar" style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingLeft: 20, paddingRight: 20, paddingBottom: 8 }}>
            {specialOffers.map((product) => (
              <div key={product.id} style={{ width: 170, flexShrink: 0 }}>
                <ProductCard product={product} onClick={p => { setSelectedProduct(p); setModalOpen(true); }} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All Products Grid */}
      <section style={{ marginTop: 24, paddingLeft: 20, paddingRight: 20, paddingBottom: 32 }}>
        <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 18, fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--color-white)', letterSpacing: 0.2 }}>
            {activeCategory === 'all'
              ? 'All Products'
              : categories.find((c) => c.slug === activeCategory)?.name || 'Products'}
          </h2>
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-muted)' }}>
            {filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''}
          </span>
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={p => { setSelectedProduct(p); setModalOpen(true); }}
              />
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 0', color: 'var(--color-muted)' }}>
            <IconSearchOff size={48} style={{ marginBottom: 12, opacity: 0.5 }} />
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-white)' }}>No products found</p>
            <p style={{ fontSize: 13, marginTop: 4 }}>Try a different search query or category</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '24px 20px 40px',
        fontSize: '11px',
        color: 'var(--color-muted)',
        letterSpacing: '0.08em',
        borderTop: '1px solid var(--color-store-border)',
        marginTop: '20px',
      }}>
        <strong style={{ color: 'var(--color-gold-dim)', fontWeight: 500 }}>TAMADDISS</strong> · Bole, Addis Ababa<br />
        All prices in Ethiopian Birr · Fast local delivery
      </footer>

      {/* Modals */}
      <ProductModal
        product={selectedProduct}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <FavoritesModal
        isOpen={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
        onProductClick={(p) => { setSelectedProduct(p); setModalOpen(true); }}
      />
    </div>
  );
}
