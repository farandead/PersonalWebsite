import { registerCommand } from './registry';
import { themes, getThemeById, applyTheme } from '../themes/themes';

registerCommand('theme', (args) => {
  if (args.length === 0) {
    const currentThemeId =
      localStorage.getItem('terminal-theme') || 'tokyo-night';
    return {
      output: [
        <div className="cmd-header">Terminal Themes</div>,
        <span className="c-dimmed">Usage: theme &lt;name&gt;</span>,
        <span>{''}</span>,
        ...themes.map((t) => (
          <div key={t.id}>
            <span style={{ color: t.colors.accent1 }}>██</span>
            <span style={{ color: t.colors.accent2 }}>██</span>
            <span style={{ color: t.colors.accent3 }}>██</span>
            <span style={{ color: t.colors.accent4 }}>██</span>
            <span style={{ color: t.colors.accent5 }}>██</span>
            <span> </span>
            <span
              className={
                t.id === currentThemeId ? 'c-accent1 c-bold' : 'c-fg'
              }
            >
              {t.name}
            </span>
            <span className="c-dimmed"> ({t.id})</span>
            {t.id === currentThemeId && (
              <span className="c-accent2"> ← active</span>
            )}
          </div>
        )),
      ],
    };
  }

  const themeId = args[0].toLowerCase();
  const theme = getThemeById(themeId);

  if (!theme) {
    const available = themes.map((t) => t.id).join(', ');
    return {
      output: [
        <span className="c-accent5">Theme '{themeId}' not found.</span>,
        <span>
          Available: <span className="c-accent1">{available}</span>
        </span>,
      ],
    };
  }

  applyTheme(theme);
  localStorage.setItem('terminal-theme', theme.id);

  return {
    output: [
      <span>
        Theme switched to{' '}
        <span className="c-accent1 c-bold">{theme.name}</span>
      </span>,
    ],
  };
});
