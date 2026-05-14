import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconPlus, IconEdit, IconTrash, IconCheck, IconX, IconPackage, IconCategory, IconMessage, IconTag, IconPhoto } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { useInquiries } from '../hooks/useInquiries';
import { useBanners } from '../hooks/useBanners';
import ImageUpload from '../components/ImageUpload';
import AdminSidebar from '../components/AdminSidebar';

export default function Admin() {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, uploadImage } = useProducts();
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const { inquiries, markHandled } = useInquiries();
  const { banners, addBanner, updateBanner, deleteBanner, uploadBannerImage } = useBanners();
  const [tab, setTab] = useState('products');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [catFormOpen, setCatFormOpen] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [bannerFormOpen, setBannerFormOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const handleLogout = async () => { await signOut(); toast.success('Logged out'); navigate('/admin/login', { replace: true }); };

  const stats = [
    { label: 'Total Products', value: products.length, icon: IconPackage, color: 'teal' },
    { label: 'Categories', value: categories.length, icon: IconCategory, color: 'blue' },
    { label: 'On Sale', value: products.filter(p => p.old_price > 0).length, icon: IconTag, color: 'amber' },
    { label: 'Inquiries', value: inquiries.length, icon: IconMessage, color: 'purple' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f3' }}>
      <AdminSidebar activeTab={tab} onTabChange={setTab} onLogout={handleLogout}
        open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <main className="admin-main">
        <header className="admin-topbar">
          <div style={{ marginLeft: window.innerWidth < 768 ? '48px' : '0' }}>
            <div className="admin-topbar-title">{tab}</div>
            <div className="admin-topbar-sub">Manage your store</div>
          </div>
          <div className="admin-avatar">{user?.email?.[0]?.toUpperCase() || 'A'}</div>
        </header>

        <div style={{ padding: '24px' }}>
          {/* Stats */}
          <div className="stats-grid">
            {stats.map(s => (
              <div key={s.label} className="stat-card">
                <div className={`stat-icon ${s.color}`}><s.icon size={20} /></div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {tab === 'products' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <span className="admin-card-title">All Products</span>
                <button className="btn-add" onClick={() => { setEditingProduct(null); setFormOpen(true); }}>
                  <IconPlus size={14} /> Add Product
                </button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Status</th><th style={{ textAlign: 'right' }}>Actions</th></tr></thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {p.image_url
                              ? <img src={p.image_url} alt="" style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'cover' }} />
                              : <span style={{ fontSize: 24 }}>{p.emoji || '📦'}</span>}
                            <span style={{ fontWeight: 600, color: '#0d2218' }}>{p.name}</span>
                          </div>
                        </td>
                        <td><span className="pill pill-teal">{p.category}</span></td>
                        <td style={{ fontWeight: 700, color: '#0f6e56' }}>ETB {p.price?.toLocaleString()}</td>
                        <td><span className={`pill ${p.is_active !== false ? 'pill-green' : 'pill-red'}`}>{p.is_active !== false ? 'Active' : 'Inactive'}</span></td>
                        <td>
                          <div className="tbl-actions">
                            <button className="tbl-btn" onClick={() => { setEditingProduct(p); setFormOpen(true); }}><IconEdit size={15} style={{ color: '#0f6e56' }} /></button>
                            <button className="tbl-btn del" onClick={async () => { if(confirm('Delete?')) { await deleteProduct(p.id); toast.success('Deleted'); }}}><IconTrash size={15} style={{ color: '#e24b4a' }} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center', padding: '48px', color: '#888780' }}>No products yet</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'categories' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span className="admin-card-title">All Categories</span>
                <button className="btn-add" onClick={() => { setEditingCat(null); setCatFormOpen(true); }}><IconPlus size={14} /> Add Category</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
                {categories.map(c => (
                  <div key={c.id} className="stat-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div className="stat-icon teal" style={{ width: 36, height: 36, marginBottom: 0 }}><IconCategory size={16} /></div>
                      <div><div style={{ fontWeight: 700, fontSize: 14, color: '#0d2218' }}>{c.name}</div><div style={{ fontSize: 11, color: '#888780' }}>/{c.slug}</div></div>
                    </div>
                    <div className="tbl-actions">
                      <button className="tbl-btn" onClick={() => { setEditingCat(c); setCatFormOpen(true); }}><IconEdit size={13} style={{ color: '#0f6e56' }} /></button>
                      <button className="tbl-btn del" onClick={async () => { if(confirm('Delete?')) { await deleteCategory(c.id); toast.success('Deleted'); }}}><IconTrash size={13} style={{ color: '#e24b4a' }} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'inquiries' && (
            <div>
              <div className="admin-card-title" style={{ marginBottom: 16 }}>Inquiries Log</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {inquiries.map(inq => (
                  <div key={inq.id} className="stat-card" style={{ padding: 20, opacity: inq.is_handled ? 0.6 : 1, borderColor: inq.is_handled ? '' : 'rgba(15,110,86,0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: '#0d2218' }}>{inq.products?.name || 'Unknown'}</div>
                        {inq.customer_phone && <div style={{ fontSize: 12, color: '#888780' }}>📞 {inq.customer_phone}</div>}
                        {inq.message && <div style={{ fontSize: 12, color: '#888780', marginTop: 4 }}>{inq.message}</div>}
                        <div style={{ fontSize: 10, color: '#888780', marginTop: 8 }}>{new Date(inq.created_at).toLocaleString()}</div>
                      </div>
                      {!inq.is_handled
                        ? <button className="btn-add" onClick={async () => { await markHandled(inq.id); toast.success('Handled'); }}><IconCheck size={13} /> Done</button>
                        : <span className="pill pill-teal">Handled</span>}
                    </div>
                  </div>
                ))}
                {inquiries.length === 0 && <div style={{ textAlign: 'center', padding: 48, color: '#888780' }}>No inquiries yet</div>}
              </div>
            </div>
          )}
          {tab === 'banners' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span className="admin-card-title">Ad Banners</span>
                <button className="btn-add" onClick={() => { setEditingBanner(null); setBannerFormOpen(true); }}><IconPlus size={14} /> Add Banner</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
                {banners.map(b => (
                  <div key={b.id} className="stat-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ height: 120, background: b.image_url ? `url(${b.image_url}) center/cover` : `linear-gradient(135deg, ${b.bg_color || '#0f6e56'}, #1d9e75)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', padding: 16 }}>
                      {!b.image_url && <span style={{ fontSize: 36 }}>{b.emoji || '📢'}</span>}
                    </div>
                    <div style={{ padding: 16 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#0d2218' }}>{b.title || 'Untitled'}</div>
                      {b.subtitle && <div style={{ fontSize: 12, color: '#888780', marginTop: 2 }}>{b.subtitle}</div>}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                        <span className={`pill ${b.is_active !== false ? 'pill-green' : 'pill-red'}`}>{b.is_active !== false ? 'Active' : 'Inactive'}</span>
                        <div className="tbl-actions">
                          <button className="tbl-btn" onClick={() => { setEditingBanner(b); setBannerFormOpen(true); }}><IconEdit size={13} style={{ color: '#0f6e56' }} /></button>
                          <button className="tbl-btn del" onClick={async () => { if(confirm('Delete banner?')) { await deleteBanner(b.id); toast.success('Deleted'); }}}><IconTrash size={13} style={{ color: '#e24b4a' }} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {banners.length === 0 && <div style={{ textAlign: 'center', padding: 48, color: '#888780', gridColumn: '1/-1' }}>No banners yet. Add your first ad banner!</div>}
              </div>
            </div>
          )}
        </div>
      </main>

      {formOpen && <ProductForm product={editingProduct} categories={categories}
        onSave={async data => {
          if(editingProduct) { await updateProduct(editingProduct.id, data); toast.success('Updated!'); }
          else { await addProduct(data); toast.success('Added!'); }
          setFormOpen(false);
        }} onUpload={uploadImage} onClose={() => setFormOpen(false)} />}

      {catFormOpen && <CategoryForm category={editingCat}
        onSave={async data => {
          if(editingCat) { await updateCategory(editingCat.id, data); toast.success('Updated!'); }
          else { await addCategory(data); toast.success('Added!'); }
          setCatFormOpen(false);
        }} onClose={() => setCatFormOpen(false)} />}

      {bannerFormOpen && <BannerForm banner={editingBanner}
        onSave={async data => {
          try {
            if(editingBanner) { await updateBanner(editingBanner.id, data); toast.success('Updated!'); }
            else { await addBanner(data); toast.success('Banner added!'); }
            setBannerFormOpen(false);
          } catch(err) { toast.error(err.message || 'Failed to save banner'); console.error('Banner save error:', err); }
        }} onUpload={uploadBannerImage} onClose={() => setBannerFormOpen(false)} />}
    </div>
  );
}

function ProductForm({ product, categories, onSave, onUpload, onClose }) {
  const [form, setForm] = useState({
    name: product?.name||'', category: product?.category||categories[0]?.name||'',
    price: product?.price||'', old_price: product?.old_price||'',
    description: product?.description||'', emoji: product?.emoji||'📦',
    image_url: product?.image_url||'', specs: product?.specs||{}, is_active: product?.is_active??true,
  });
  const [specKeys, setSpecKeys] = useState(Object.keys(form.specs).length>0 ? Object.keys(form.specs) : ['','','','']);
  const [specVals, setSpecVals] = useState(Object.keys(form.specs).length>0 ? Object.values(form.specs) : ['','','','']);
  const set = (k,v) => setForm(f => ({...f,[k]:v}));

  const handleSave = () => {
    if(!form.name||!form.price){toast.error('Name & price required');return;}
    const specs = {};
    specKeys.forEach((k,i) => { if(k.trim()) specs[k.trim()] = specVals[i]?.trim()||''; });
    onSave({...form, price:Number(form.price), old_price:Number(form.old_price)||0, specs});
  };

  return (
    <div style={{ position:'fixed',inset:0,zIndex:60,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0.5)',backdropFilter:'blur(4px)' }} onClick={onClose}>
      <div style={{ background:'#fff',borderRadius:24,padding:24,width:'90%',maxWidth:480,maxHeight:'85vh',overflowY:'auto' }} className="animate-scale-in" onClick={e=>e.stopPropagation()}>
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20 }}>
          <h3 style={{ fontSize:18,fontWeight:800,color:'#0d2218' }}>{product?'Edit Product':'Add Product'}</h3>
          <button onClick={onClose} style={{ width:32,height:32,borderRadius:'50%',border:'none',background:'#f4f6f3',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }}><IconX size={16} /></button>
        </div>
        <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
          <ImageUpload currentUrl={form.image_url} onUpload={async f=>{const url=await onUpload(f);set('image_url',url);toast.success('Uploaded');}} onRemove={()=>set('image_url','')} />
          <Fld label="Product Name"><input value={form.name} onChange={e=>set('name',e.target.value)} className="form-input" /></Fld>
          <Fld label="Category"><select value={form.category} onChange={e=>set('category',e.target.value)} className="form-input">{categories.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}</select></Fld>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:12 }}>
            <Fld label="Price (ETB)"><input type="number" value={form.price} onChange={e=>set('price',e.target.value)} className="form-input" /></Fld>
            <Fld label="Old Price"><input type="number" value={form.old_price} onChange={e=>set('old_price',e.target.value)} className="form-input" /></Fld>
          </div>
          <Fld label="Description"><textarea value={form.description} onChange={e=>set('description',e.target.value)} rows={3} className="form-input" style={{ resize:'vertical' }} /></Fld>
          <Fld label="Emoji"><input value={form.emoji} onChange={e=>set('emoji',e.target.value)} className="form-input" style={{ width:80,textAlign:'center',fontSize:20 }} /></Fld>
          <div style={{ fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:1,color:'#888780' }}>Specs</div>
          {specKeys.map((k,i)=>(
            <div key={i} style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:8 }}>
              <input value={k} onChange={e=>{const n=[...specKeys];n[i]=e.target.value;setSpecKeys(n);}} placeholder="Key" className="form-input" style={{ fontSize:12 }} />
              <input value={specVals[i]} onChange={e=>{const n=[...specVals];n[i]=e.target.value;setSpecVals(n);}} placeholder="Value" className="form-input" style={{ fontSize:12 }} />
            </div>
          ))}
        </div>
        <div style={{ display:'flex',gap:12,marginTop:20 }}>
          <button onClick={onClose} style={{ flex:1,padding:14,borderRadius:12,border:'none',background:'#f4f6f3',fontWeight:600,fontSize:14,cursor:'pointer',fontFamily:'inherit' }}>Cancel</button>
          <button onClick={handleSave} style={{ flex:1,padding:14,borderRadius:12,border:'none',background:'#0f6e56',color:'#fff',fontWeight:700,fontSize:14,cursor:'pointer',fontFamily:'inherit' }}>Save Product</button>
        </div>
      </div>
    </div>
  );
}

function CategoryForm({ category, onSave, onClose }) {
  const [name, setName] = useState(category?.name||'');
  const [icon, setIcon] = useState(category?.icon||'apps');
  const [slug, setSlug] = useState(category?.slug||'');
  return (
    <div style={{ position:'fixed',inset:0,zIndex:60,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div style={{ background:'#fff',borderRadius:24,padding:24,width:'90%',maxWidth:380 }} className="animate-scale-in" onClick={e=>e.stopPropagation()}>
        <h3 style={{ fontSize:18,fontWeight:800,color:'#0d2218',marginBottom:16 }}>{category?'Edit':'Add'} Category</h3>
        <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
          <Fld label="Name"><input value={name} onChange={e=>setName(e.target.value)} className="form-input" /></Fld>
          <Fld label="Icon"><input value={icon} onChange={e=>setIcon(e.target.value)} className="form-input" placeholder="e.g. device-tv" /></Fld>
          <Fld label="Slug"><input value={slug} onChange={e=>setSlug(e.target.value)} className="form-input" placeholder="auto" /></Fld>
        </div>
        <div style={{ display:'flex',gap:12,marginTop:20 }}>
          <button onClick={onClose} style={{ flex:1,padding:14,borderRadius:12,border:'none',background:'#f4f6f3',fontWeight:600,cursor:'pointer',fontFamily:'inherit' }}>Cancel</button>
          <button onClick={()=>{if(!name){toast.error('Name required');return;}onSave({name,icon,slug:slug||name.toLowerCase().replace(/\s+/g,'-')});}} style={{ flex:1,padding:14,borderRadius:12,border:'none',background:'#0f6e56',color:'#fff',fontWeight:700,cursor:'pointer',fontFamily:'inherit' }}>Save</button>
        </div>
      </div>
    </div>
  );
}

function BannerForm({ banner, onSave, onUpload, onClose }) {
  const [form, setForm] = useState({
    title: banner?.title||'', subtitle: banner?.subtitle||'',
    description: banner?.description||'', cta_text: banner?.cta_text||'',
    bg_color: banner?.bg_color||'#0f6e56', emoji: banner?.emoji||'📢',
    image_url: banner?.image_url||'', is_active: banner?.is_active??true,
    sort_order: banner?.sort_order||0,
  });
  const set = (k,v) => setForm(f => ({...f,[k]:v}));
  return (
    <div style={{ position:'fixed',inset:0,zIndex:60,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0.5)',backdropFilter:'blur(4px)' }} onClick={onClose}>
      <div style={{ background:'#fff',borderRadius:24,padding:24,width:'90%',maxWidth:480,maxHeight:'85vh',overflowY:'auto' }} className="animate-scale-in" onClick={e=>e.stopPropagation()}>
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20 }}>
          <h3 style={{ fontSize:18,fontWeight:800,color:'#0d2218' }}>{banner?'Edit Banner':'Add Banner'}</h3>
          <button onClick={onClose} style={{ width:32,height:32,borderRadius:'50%',border:'none',background:'#f4f6f3',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }}><IconX size={16} /></button>
        </div>
        <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
          <ImageUpload currentUrl={form.image_url} onUpload={async f=>{const url=await onUpload(f);set('image_url',url);toast.success('Uploaded');}} onRemove={()=>set('image_url','')} />
          <Fld label="Title"><input value={form.title} onChange={e=>set('title',e.target.value)} className="form-input" placeholder="e.g. Special Offer" /></Fld>
          <Fld label="Subtitle"><input value={form.subtitle} onChange={e=>set('subtitle',e.target.value)} className="form-input" /></Fld>
          <Fld label="Description"><input value={form.description} onChange={e=>set('description',e.target.value)} className="form-input" /></Fld>
          <Fld label="CTA Text"><input value={form.cta_text} onChange={e=>set('cta_text',e.target.value)} className="form-input" placeholder="e.g. Call 0911675921" /></Fld>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12 }}>
            <Fld label="BG Color"><input type="color" value={form.bg_color} onChange={e=>set('bg_color',e.target.value)} style={{ width:'100%',height:40,border:'none',borderRadius:8,cursor:'pointer' }} /></Fld>
            <Fld label="Emoji"><input value={form.emoji} onChange={e=>set('emoji',e.target.value)} className="form-input" style={{ textAlign:'center',fontSize:20 }} /></Fld>
            <Fld label="Order"><input type="number" value={form.sort_order} onChange={e=>set('sort_order',Number(e.target.value))} className="form-input" /></Fld>
          </div>
          <label style={{ display:'flex',alignItems:'center',gap:8,fontSize:13,fontWeight:600,color:'#0d2218',cursor:'pointer' }}>
            <input type="checkbox" checked={form.is_active} onChange={e=>set('is_active',e.target.checked)} /> Active
          </label>
        </div>
        <div style={{ display:'flex',gap:12,marginTop:20 }}>
          <button onClick={onClose} style={{ flex:1,padding:14,borderRadius:12,border:'none',background:'#f4f6f3',fontWeight:600,cursor:'pointer',fontFamily:'inherit' }}>Cancel</button>
          <button onClick={()=>onSave(form)} style={{ flex:1,padding:14,borderRadius:12,border:'none',background:'#0f6e56',color:'#fff',fontWeight:700,cursor:'pointer',fontFamily:'inherit' }}>Save Banner</button>
        </div>
      </div>
    </div>
  );
}

function Fld({ label, children }) {
  return <div><label style={{ display:'block',marginBottom:4,fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:0.8,color:'#888780' }}>{label}</label>{children}</div>;
}
