import { useLang } from '../App'

export default function Footer() {
    const { data } = useLang()
    return (
        <>
            <footer>
                <div className="container footer-inner">
                    <p className="footer-logo">GIS<span>.</span>Engineer</p>
                    <p className="footer-copy">{data.footer.copy}</p>
                </div>
            </footer>
            <button
                id="back-to-top"
                aria-label="Back to top"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <i className="bi bi-arrow-up"></i>
            </button>
        </>
    )
}
