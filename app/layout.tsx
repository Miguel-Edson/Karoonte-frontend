// app/layout.tsx
import "./globals.css"; 

export const metadata = {
  title: "Karoonte",
  description: "Jogo interativo",
  // Adicione esta linha abaixo para forçar o ícone:
  icons: {
   icon: "/favicon.svg?v=1",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
