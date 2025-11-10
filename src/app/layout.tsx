import type { Metadata } from 'next';
import { Roboto_Condensed } from 'next/font/google';
import './globals.css';

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  variable: '--font-roboto-condensed',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Prueba Aeromexico',
  description: 'Aplicación de muestra para la prueba técnica de Aeromexico',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} data-lt-installed={true}>
      <body className={robotoCondensed.className}>{children}</body>
    </html>
  );
}
