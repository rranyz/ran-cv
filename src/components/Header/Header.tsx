import Link from 'next/link'
import { useMemo } from 'react'
import { useWindowScroll } from 'react-use'
import style from './Header.module.css'

const Header = () => {
  const { y } = useWindowScroll()

  const cachedClass = useMemo(() => y !== 0, [y])

  return (
    <header
      className={[
        style.mainHeader,
        cachedClass ? style.mainHeaderDark : ''
      ].join(' ')}
    >
      <p className={style.logo}>Rannie</p>
      <nav className={style.navWrapper}>
        <Link className={style.navLink} href="#info">
          About
        </Link>
        <Link className={style.navLink} href="#todo">
          Todo
        </Link>
        <Link className={style.navLink} href="#skills">
          Skills
        </Link>
        <Link className={style.navLink} href="#exp">
          Experience
        </Link>
        <Link className={style.navLink} href="#contact">
          Contact
        </Link>
      </nav>
    </header>
  )
}

export default Header
