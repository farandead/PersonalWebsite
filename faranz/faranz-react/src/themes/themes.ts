export interface Theme {
  id: string;
  name: string;
  colors: {
    bg: string;
    fg: string;
    promptUser: string;
    promptPath: string;
    promptSymbol: string;
    accent1: string;
    accent2: string;
    accent3: string;
    accent4: string;
    accent5: string;
    dimmed: string;
    border: string;
    titleBarBg: string;
    titleBarFg: string;
    tabBg: string;
    tabActiveBg: string;
    tabActiveFg: string;
    selectionBg: string;
    scrollbarThumb: string;
  };
}

export const themes: Theme[] = [
  {
    id: 'tokyo-night',
    name: 'Tokyo Night',
    colors: {
      bg: '#0a0a0f',
      fg: '#c0caf5',
      promptUser: '#7aa2f7',
      promptPath: '#9ece6a',
      promptSymbol: '#bb9af7',
      accent1: '#7dcfff',
      accent2: '#9ece6a',
      accent3: '#e0af68',
      accent4: '#bb9af7',
      accent5: '#f7768e',
      dimmed: '#565f89',
      border: '#15151f',
      titleBarBg: '#06060a',
      titleBarFg: '#565f89',
      tabBg: '#08080d',
      tabActiveBg: '#15151f',
      tabActiveFg: '#c0caf5',
      selectionBg: '#283457',
      scrollbarThumb: '#15151f',
    },
  },
  {
    id: 'dracula',
    name: 'Dracula',
    colors: {
      bg: '#0d0d14',
      fg: '#f8f8f2',
      promptUser: '#8be9fd',
      promptPath: '#50fa7b',
      promptSymbol: '#bd93f9',
      accent1: '#8be9fd',
      accent2: '#50fa7b',
      accent3: '#f1fa8c',
      accent4: '#ff79c6',
      accent5: '#ff5555',
      dimmed: '#6272a4',
      border: '#191922',
      titleBarBg: '#08080e',
      titleBarFg: '#6272a4',
      tabBg: '#0a0a12',
      tabActiveBg: '#191922',
      tabActiveFg: '#f8f8f2',
      selectionBg: '#44475a',
      scrollbarThumb: '#191922',
    },
  },
  {
    id: 'monokai',
    name: 'Monokai',
    colors: {
      bg: '#0c0c08',
      fg: '#f8f8f2',
      promptUser: '#66d9ef',
      promptPath: '#a6e22e',
      promptSymbol: '#ae81ff',
      accent1: '#66d9ef',
      accent2: '#a6e22e',
      accent3: '#e6db74',
      accent4: '#ae81ff',
      accent5: '#f92672',
      dimmed: '#75715e',
      border: '#1a1a12',
      titleBarBg: '#070704',
      titleBarFg: '#75715e',
      tabBg: '#0a0a06',
      tabActiveBg: '#1a1a12',
      tabActiveFg: '#f8f8f2',
      selectionBg: '#49483e',
      scrollbarThumb: '#1a1a12',
    },
  },
  {
    id: 'catppuccin',
    name: 'Catppuccin Mocha',
    colors: {
      bg: '#0a0a14',
      fg: '#cdd6f4',
      promptUser: '#89b4fa',
      promptPath: '#a6e3a1',
      promptSymbol: '#cba6f7',
      accent1: '#89dceb',
      accent2: '#a6e3a1',
      accent3: '#f9e2af',
      accent4: '#f5c2e7',
      accent5: '#f38ba8',
      dimmed: '#6c7086',
      border: '#151520',
      titleBarBg: '#06060c',
      titleBarFg: '#6c7086',
      tabBg: '#08080f',
      tabActiveBg: '#151520',
      tabActiveFg: '#cdd6f4',
      selectionBg: '#45475a',
      scrollbarThumb: '#151520',
    },
  },
  {
    id: 'gruvbox',
    name: 'Gruvbox Dark',
    colors: {
      bg: '#0c0c08',
      fg: '#ebdbb2',
      promptUser: '#83a598',
      promptPath: '#b8bb26',
      promptSymbol: '#d3869b',
      accent1: '#83a598',
      accent2: '#b8bb26',
      accent3: '#fabd2f',
      accent4: '#d3869b',
      accent5: '#fb4934',
      dimmed: '#928374',
      border: '#1a1810',
      titleBarBg: '#070604',
      titleBarFg: '#928374',
      tabBg: '#0a0906',
      tabActiveBg: '#1a1810',
      tabActiveFg: '#ebdbb2',
      selectionBg: '#504945',
      scrollbarThumb: '#1a1810',
    },
  },
  {
    id: 'matrix',
    name: 'Matrix',
    colors: {
      bg: '#000000',
      fg: '#00ff41',
      promptUser: '#00ff41',
      promptPath: '#00cc33',
      promptSymbol: '#00ff41',
      accent1: '#00ff41',
      accent2: '#00cc33',
      accent3: '#33ff77',
      accent4: '#00ff99',
      accent5: '#ff0040',
      dimmed: '#005500',
      border: '#0a1a0a',
      titleBarBg: '#000000',
      titleBarFg: '#005500',
      tabBg: '#000000',
      tabActiveBg: '#0a1a0a',
      tabActiveFg: '#00ff41',
      selectionBg: '#003300',
      scrollbarThumb: '#0a1a0a',
    },
  },
];

export const DEFAULT_THEME_ID = 'tokyo-night';

export function getThemeById(id: string): Theme | undefined {
  return themes.find(t => t.id === id);
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(theme.colors)) {
    root.style.setProperty(`--t-${camelToKebab(key)}`, value);
  }
}

function camelToKebab(str: string): string {
  return str.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
}
