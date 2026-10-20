import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import { useLang } from '../App'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function FreelancerPage() {
    const { lang, data } = useLang()

    useEffect(() => {
        AOS.init({ duration: 700, once: true })
        const preloader = document.getElementById('preloader')
        setTimeout(() => preloader?.classList.add('hidden'), 400)
    }, [])

    const title = lang === 'es' ? 'Proyectos Independientes' : 'Freelancer Projects'
    const subtitle = lang === 'es'
        ? 'Proyectos realizados de forma independiente como consultor GIS y desarrollador.'
        : 'Projects delivered independently as a GIS consultant and developer.'
    const backLabel = lang === 'es' ? 'Volver al inicio' : 'Back to Home'
    const projects = data.freelancer_projects || []

    return (
        <>
            <div id="preloader"><div className="preloader-ring"></div></div>
            <Navbar />

            <section className="job-detail-hero">
                <div className="container">
                    <Link to="/" className="job-back">
                        <i className="bi bi-arrow-left"></i>
                        <span>{backLabel}</span>
                    </Link>
                    <div className="job-id-tag">#freelancer</div>
                    <h1 className="job-position">{title}</h1>
                    <p className="job-company">{subtitle}</p>
                </div>
            </section>

            <section id="freelancer-content" style={{ padding: '80px 0' }}>
                <div className="container">
                    <div className="freelancer-grid">
                        {projects.map((proj) => {
                            const CardContent = (
                                <>
                                    <div className="freelancer-card-meta">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span className="freelancer-year">{proj.period}</span>
                                            {proj.badge && (
                                                <span className="freelancer-badge-pill">
                                                    <i className="bi bi-broadcast"></i> {proj.badge}
                                                </span>
                                            )}
                                        </div>
                                        <span className="freelancer-client">{proj.client}</span>
                                    </div>
                                    <h3 className="freelancer-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>{proj.title}</span>
                                        {proj.link && <i className="bi bi-arrow-up-right-square" style={{ fontSize: '1.1rem', color: '#ff3b47' }}></i>}
                                    </h3>
                                    <p className="freelancer-desc">{proj.description}</p>
                                    <div className="freelancer-tools">
                                        {proj.tools.map((tool, idx) => (
                                            <span key={idx} className="freelancer-tool">{tool}</span>
                                        ))}
                                    </div>
                                    {proj.link && (
                                        <div className="freelancer-card-action">
                                            <span className="btn-freelancer-action">
                                                <span>{lang === 'es' ? 'Explorar Aplicación' : 'Launch Application'}</span>
                                                <i className="bi bi-arrow-right"></i>
                                            </span>
                                        </div>
                                    )}
                                </>
                            )

                            return proj.link ? (
                                <Link
                                    key={proj.id}
                                    to={proj.link}
                                    className="freelancer-card clickable"
                                    data-aos="fade-up"
                                >
                                    {CardContent}
                                </Link>
                            ) : (
                                <div key={proj.id} className="freelancer-card" data-aos="fade-up">
                                    {CardContent}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}
