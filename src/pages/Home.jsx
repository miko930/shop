import { useState, useMemo } from 'react';
import { IconSearch, IconX, IconSearchOff, IconChevronRight } from '@tabler/icons-react';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import Navbar from '../components/Navbar';
import AdBanner from '../components/AdBanner';
import CategoryChips from '../components/CategoryChips';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import ProductModal from '../components/ProductModal';
import PhonePopup from '../components/PhonePopup';

export default function Home() {
  const { products, loading } = useProducts();
  const { categories } = useCategories();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(false);

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
    <div style={{ minHeight: '100vh', paddingBottom: 32, backgroundColor: '#f9faf9' }}>
      {/* Header + Search */}
      <Navbar>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          borderRadius: 22, padding: '17px 20px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: '1px solid rgba(0,0,0,0.04)',
        }}>
          <IconSearch size={24} style={{ color: '#999', flexShrink: 0 }} stroke={1.8} />
          <input
            type="text"
            placeholder="Search Products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%', background: 'transparent', fontSize: 16,
              fontWeight: 500, outline: 'none', border: 'none',
              color: '#0d2218', fontFamily: 'inherit',
            }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{ color: '#888780', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
              <IconX size={18} />
            </button>
          )}
        </div>
      </Navbar>

      {/* Ad Banner */}
      <section style={{ marginTop: 28, paddingLeft: 20, paddingRight: 20 }}>
        <AdBanner />
      </section>

      {/* Categories */}
      <section style={{ marginTop: 32 }}>
        <div style={{ marginBottom: 16, paddingLeft: 20, paddingRight: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0a1628', letterSpacing: -0.3 }}>Categories</h2>
        </div>
        <CategoryChips
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      </section>

      {/* Special Offers */}
      {specialOffers.length > 0 && (
        <section style={{
          marginTop: 32, paddingTop: 28, paddingBottom: 32,
          backgroundColor: '#eef1f8',
          borderTopLeftRadius: 32, borderTopRightRadius: 32,
        }}>
          <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0a1628', letterSpacing: -0.3 }}>Special Offers</h2>
            <button style={{ fontSize: 14, fontWeight: 600, color: '#d4a437', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
              See All
            </button>
          </div>
          <div className="hide-scrollbar" style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingLeft: 20, paddingRight: 20, paddingBottom: 8 }}>
            {specialOffers.map((product) => (
              <div key={product.id} style={{ width: 200, flexShrink: 0 }}>
                <ProductCard product={product} onClick={p => { setSelectedProduct(p); setModalOpen(true); }} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All Products */}
      <section style={{ marginTop: 32, paddingLeft: 20, paddingRight: 20, paddingBottom: 32 }}>
        <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0d2218', letterSpacing: -0.3 }}>
            {activeCategory === 'all'
              ? 'All Products'
              : categories.find((c) => c.slug === activeCategory)?.name || 'Products'}
          </h2>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#888780' }}>
            {filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''}
          </span>
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={p => { setSelectedProduct(p); setModalOpen(true); }}
              />
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 0', color: '#888780' }}>
            <IconSearchOff size={48} style={{ marginBottom: 12, opacity: 0.5 }} />
            <p style={{ fontSize: 15, fontWeight: 600 }}>No products found</p>
            <p style={{ fontSize: 13, marginTop: 4 }}>Try a different search or category</p>
          </div>
        )}
      </section>



      <ProductModal
        product={selectedProduct}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onBuyNow={() => setPhoneOpen(true)}
      />
      <PhonePopup isOpen={phoneOpen} onClose={() => setPhoneOpen(false)} />
    </div>
  );
}
