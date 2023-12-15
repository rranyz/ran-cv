import Link from 'next/link'

const Header = () => (
  <header className="mainHeader">
    <p className="logo">Rannie</p>
    <nav>
      <Link href="#">About</Link>
      <Link href="#">Passion</Link>
      <Link href="#">Experience</Link>
      <Link href="#">Work</Link>
      <Link href="#">Contact</Link>
    </nav>
  </header>
)

export default Header
