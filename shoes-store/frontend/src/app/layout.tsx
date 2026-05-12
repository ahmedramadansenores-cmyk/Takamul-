import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Shoes Store - Premium Footwear for Everyone',
  description: 'Discover the latest trends in footwear. Shop men\'s, women\'s, and kids\' shoes from top brands.',
  keywords: ['shoes', 'footwear', 'sneakers', 'sports', 'luxury', 'fashion'],
  authors: [{ name: 'Shoes Store Team' }],
  openGraph: {
    title: 'Shoes Store - Premium Footwear',
    description: 'Discover the latest trends in footwear.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
