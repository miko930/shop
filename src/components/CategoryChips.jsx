import {
  IconApps, IconDeviceTv, IconToolsKitchen2, IconDroplet,
  IconSalad, IconSofa, IconBabyCarriage, IconShirt, IconBolt, IconHeart,
} from '@tabler/icons-react';

const ICON_MAP = {
  'apps': IconApps, 'device-tv': IconDeviceTv, 'tool-kitchen-2': IconToolsKitchen2,
  'droplet': IconDroplet, 'salad': IconSalad, 'sofa': IconSofa,
  'baby-carriage': IconBabyCarriage, 'shirt': IconShirt, 'bolt': IconBolt, 'heart': IconHeart,
};

const AMHARIC_LABELS = {
  'all': 'ሁሉም', 'electronics': 'ኤሌክትሮኒክስ', 'kitchen': 'ጤና እና ውበት',
  'cleaning': 'የማዕድ ቤት ዕቃዎች', 'food': 'ምግብ', 'furniture': 'የቤት ዕቃዎች', 'baby': 'ለህፃናት',
};

function getCategoryIcon(iconName) { return ICON_MAP[iconName] || IconApps; }

export default function CategoryChips({ categories, activeCategory, onSelect }) {
  const allCategories = [{ id: 'all', name: 'All', icon: 'apps', slug: 'all' }, ...categories];

  return (
    <div className="hide-scrollbar" style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingLeft: 20, paddingRight: 20, paddingTop: 4, paddingBottom: 4 }}>
      {allCategories.map((cat) => {
        const isActive = activeCategory === cat.slug;
        const IconComponent = getCategoryIcon(cat.icon);
        const amharicLabel = AMHARIC_LABELS[cat.slug] || cat.name;

        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.slug)}
            style={{ display: 'flex', flexShrink: 0, flexDirection: 'column', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <div style={{
              display: 'flex', height: 64, width: 64, alignItems: 'center', justifyContent: 'center',
              borderRadius: '50%', transition: 'all 0.3s',
              backgroundColor: isActive ? '#1a3a6b' : '#f0f1f3',
              color: isActive ? '#fff' : '#1a3a6b',
              boxShadow: isActive ? '0 8px 20px rgba(26, 58, 107, 0.3)' : 'none',
            }}>
              <IconComponent size={26} stroke={1.5} />
            </div>
            <span style={{
              maxWidth: 80, textAlign: 'center', fontSize: 12, fontWeight: 600,
              lineHeight: 1.2, whiteSpace: 'nowrap', transition: 'color 0.3s',
              color: isActive ? '#0a1628' : '#6b7280', fontFamily: 'inherit',
            }}>
              {amharicLabel}
            </span>
          </button>
        );
      })}
    </div>
  );
}
