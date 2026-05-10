import Link from 'next/link'
import AuthNavigation from '@/components/AuthNavigation/AuthNavigation'

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>

          <AuthNavigation />
        </ul>
      </nav>
    </header>
  )
}