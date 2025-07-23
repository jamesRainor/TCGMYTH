import type { Config } from 'tailwindcss';
const config:Config={content:['./src/**/*.{ts,tsx}'],theme:{extend:{colors:{page:'var(--bg-page)',content:'var(--bg-content)',accent:'var(--accent)',preorder:'var(--preorder)',soldout:'var(--soldout)'}}},plugins:[]};
export default config;