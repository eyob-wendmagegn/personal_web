import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';

export const metadata = {
  title: {
    default: 'Eyob Wendmagegn Portfolio',
    template: '%s | Eyob Wendmagegn Portfolio',
  },
  description: 'Portfolio website',
};8

export default function RootLayout({ children }) {
  // Determine initial theme and language from localStorage or default
  const initialTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light';
  const initialLanguage = typeof window !== 'undefined' ? localStorage.getItem('language') || 'en' : 'en';

  return (
    <html lang={initialLanguage}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('theme') || 'light';
                if (savedTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
                // Disable transition on initial load
                document.documentElement.style.transition = 'none';
                setTimeout(() => {
                  document.documentElement.style.transition = 'background-color 0.3s, color 0.3s';
                }, 0);
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider initialTheme={initialTheme} initialLanguage={initialLanguage}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}