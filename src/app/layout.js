import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Meu Weather App',
  description: 'Previsão do tempo feita com Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        
        {}
        <nav style={{ padding: '10px', background: '#eee' }}>
            <span>☀️ WeatherApp</span>
        </nav>

        {}
        {children}

      </body>
    </html>
  )
}