import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': 'rgb(var(--background))',
        'foreground': 'rgb(var(--foreground))',
        'primary': 'rgb(var(--primary))',
        'primary-foreground': 'rgb(var(--primary-foreground))',
        'border': 'rgb(var(--border))',
        'label': 'rgb(var(--label))',
        'placeholder': 'rgb(var(--placeholder))',
        'muted': 'rgb(var(--muted))',
        'destructive': 'rgb(var(--destructive))'
      },
    }
  },
  plugins: [],
};
export default config;


