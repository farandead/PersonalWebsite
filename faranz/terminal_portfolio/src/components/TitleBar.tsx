interface TitleBarProps {
  title?: string;
}

export default function TitleBar({ title = 'faran@portfolio: ~' }: TitleBarProps) {
  return (
    <div className="title-bar">
      <div className="traffic-lights">
        <span className="traffic-light traffic-light--close">&#x2715;</span>
        <span className="traffic-light traffic-light--minimize">&#x2013;</span>
        <span className="traffic-light traffic-light--expand">&#x2b1a;</span>
      </div>
      <span className="title-bar__title">{title}</span>
    </div>
  );
}
