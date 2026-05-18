interface TabBarProps {
  tabs: string[];
  activeTab: string | null;
  onTabClick: (tab: string) => void;
}

export default function TabBar({ tabs, activeTab, onTabClick }: TabBarProps) {
  return (
    <div className="tab-bar">
      {tabs.map(tab => (
        <button
          key={tab}
          className={`tab ${activeTab === tab ? 'tab--active' : ''}`}
          onClick={() => onTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
