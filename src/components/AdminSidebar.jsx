import { IconBuildingStore, IconPackage, IconCategory, IconMessage, IconLogout, IconMenu2, IconX, IconPhoto } from '@tabler/icons-react';

const NAV = [
  { key: 'products', label: 'Products', icon: IconPackage },
  { key: 'categories', label: 'Categories', icon: IconCategory },
  { key: 'banners', label: 'Banners', icon: IconPhoto },
  { key: 'inquiries', label: 'Inquiries', icon: IconMessage },
];

export default function AdminSidebar({ activeTab, onTabChange, onLogout, open, onToggle }) {
  return (
    <>
      {open && <div className="sidebar-overlay" onClick={onToggle} />}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon"><IconBuildingStore size={20} /></div>
          <div><div className="sidebar-brand">TAMADDISS</div><div className="sidebar-sub">Admin Panel</div></div>
          <button className="sidebar-close" onClick={onToggle}><IconX size={16} /></button>
        </div>
        <nav className="sidebar-nav">
          <p className="sidebar-label">Menu</p>
          {NAV.map(n => (
            <button key={n.key} onClick={() => { onTabChange(n.key); if(window.innerWidth<768) onToggle(); }}
              className={`sidebar-item ${activeTab===n.key ? 'active' : ''}`}>
              <n.icon size={18} />{n.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="sidebar-item logout" onClick={onLogout}><IconLogout size={18} />Logout</button>
        </div>
      </aside>
      <button className="sidebar-toggle" onClick={onToggle}><IconMenu2 size={20} /></button>
    </>
  );
}
