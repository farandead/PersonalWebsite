/// <reference types="vite/client" />

declare module '*.txt?raw' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}
