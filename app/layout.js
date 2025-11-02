import './globals.css';

export const metadata = {
  title: 'Salah Timer',
  description: 'Beautiful Salah Timer built with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-800 text-gray-100 relative min-h-screen">
        <div 
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.03]"
          style={{ backgroundSize: 'auto' }}
        />
        {children}
      </body>
    </html>
  );
}
