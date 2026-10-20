import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../App'

export default function Navbar() {
    const { lang, setLang, data } = useLang()
    const { pathname } = useLocation()
    const nav = data.navtop

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.getElementById('navbar')
            if (navbar) {
                navbar.classList.toggle('scrolled', window.scrollY > 60)
            }
        }
        window.addEventListener('scroll', handleScroll)
        // Run once on mount to catch current scroll position
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const closeMenu = () => {
        document.getElementById('navLinks')?.classList.remove('open')
    }

    return (
        <nav id="navbar">
            <div className="container nav-inner">
                <Link to="/" className="nav-logo" onClick={closeMenu}>GIS<span>.</span>Engineer</Link>
                <ul className="nav-links" id="navLinks">
                    <li><Link to="/#hero" onClick={closeMenu}>{nav.hm}</Link></li>
                    <li><Link to="/#education" onClick={closeMenu}>{nav.ed}</Link></li>
                    <li><Link to="/#about" onClick={closeMenu}>{nav.ab}</Link></li>
                    <li><Link to="/#experience" onClick={closeMenu}>{nav.pt}</Link></li>
                    <li><Link to="/#portfolio" onClick={closeMenu}>{nav.rs}</Link></li>
                    <li><Link to="/#contact" onClick={closeMenu}>{nav.ct}</Link></li>
                    <li><Link to="/freelancer" onClick={closeMenu}>{nav.fl}</Link></li>
                    <li><Link to="/gisp-test" onClick={closeMenu}>{nav.gt}</Link></li>
                </ul>
                <div className="lang-toggle">
                    <span className="lang-label"><span className="fi fi-es"></span></span>
                    <label className="lang-switch">
                        <input
                            type="checkbox"
                            checked={lang === 'en'}
                            onChange={e => setLang(e.target.checked ? 'en' : 'es')}
                        />
                        <span className="lang-slider">
                            <span className="lang-knob">
                                <span className={`fi fi-${lang === 'es' ? 'es' : 'us'}`}></span>
                            </span>
                        </span>
                    </label>
                    <span className="lang-label"><span className="fi fi-us"></span></span>
                </div>
                <button
                    className="nav-hamburger"
                    id="hamburger"
                    aria-label="Menu"
                    onClick={() => {
                        document.getElementById('navLinks')?.classList.toggle('open')
                    }}
                >
                    <span></span><span></span><span></span>
                </button>
            </div>
        </nav>
    )
}
