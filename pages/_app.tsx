import { Oswald, Fira_Sans } from 'next/font/google';
import type { AppProps } from 'next/app'; 
import '../styles/main.sass';

const oswald = Oswald({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'], 
  display: 'swap',
  variable: '--font-oswald', 
});

const firaSans = Fira_Sans({
  subsets: ['latin', 'cyrillic'], 
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-fira-sans',
});

export default function App({ Component, pageProps }: AppProps) {
  return <div className={`${oswald.variable} ${firaSans.variable}`}><Component {...pageProps} /></div>;
}