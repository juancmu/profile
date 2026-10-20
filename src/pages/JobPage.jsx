import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import AOS from 'aos'
import { useLang } from '../App'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function JobPage() {
    const { id } = useParams()
    const { lang, data } = useLang()
    const job = data.work_experience.find(j => j.id === id)
    const [ProjectComp, setProjectComp] = useState(null)
    const [isExpanded, setIsExpanded] = useState(false)

    const bgImage = id ? `/projects/${id}/${id}.jpg` : ''
    const heroStyle = bgImage ? {
        backgroundImage: `linear-gradient(rgba(10, 15, 30, 0.85), rgba(10, 15, 30, 0.85)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    } : {}

    useEffect(() => {
        if (id) {
            import(`../../projects/${id}/${id}.jsx`)
                .then((module) => {
                    setProjectComp(() => module.default)
                })
                .catch((err) => {
                    console.error('Failed to load project component:', err)
                    setProjectComp(null)
                })
        }
    }, [id])

    useEffect(() => {
        AOS.init({ duration: 700, once: true })
        const preloader = document.getElementById('preloader')
        setTimeout(() => preloader?.classList.add('hidden'), 400)
    }, [])

    const backLabel = lang === 'es' ? 'Volver a Experiencia' : 'Back to Experience'
    const viewLabel = lang === 'es' ? 'Ver proyecto' : 'View project'
    const notFoundTitle = lang === 'es' ? 'Experiencia no encontrada' : 'Experience not found'
    const notFoundSub = lang === 'es' ? 'El ID solicitado no existe.' : 'The requested job ID does not exist.'

    return (
        <>
            <div id="preloader"><div className="preloader-ring"></div></div>
            <Navbar />


            {job ? (
                <>
                    <section className="job-detail-hero" style={heroStyle}>
                        <div className="container">

                            {/* <div className="job-id-tag">#{job.id}</div> */}
                            <div className="job-main-info">
                                <div className="job-header">
                                    <h4 className="job-position">{job.position}</h4>
                                    <p className="job-company">{job.company}  <span className="job-period">{job.period}</span></p>
                                </div>
                                
                                <div className="job-description" style={{
                                    maxHeight: isExpanded ? '500px' : '0',
                                    overflow: 'hidden',
                                    transition: 'max-height 0.4s ease-in-out, opacity 0.4s ease-in-out',
                                    opacity: isExpanded ? 1 : 0,
                                    marginTop: isExpanded ? '16px' : '0'
                                }}>
                                    <p className="job-desc" style={{ marginBottom: 0 }}>{job.description}</p>
                                </div>
                            </div>

                            <button 
                                onClick={() => setIsExpanded(!isExpanded)} 
                                style={{ 
                                    position: 'absolute', 
                                    bottom: '20px', 
                                    right: '20px', 
                                    background: 'transparent', 
                                    border: '1px solid var(--color-primary)', 
                                    color: 'var(--color-primary)', 
                                    borderRadius: '50%', 
                                    width: '40px', 
                                    height: '40px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    cursor: 'pointer', 
                                    transition: 'all 0.3s' 
                                }}
                            >
                                <i className={`bi bi-chevron-${isExpanded ? 'up' : 'down'}`}></i>
                            </button>
                        </div>
                    </section>
                </>
            ) : (
                <section style={{ textAlign: 'center', padding: '120px 0' }}>
                    <div className="container">
                        <i className="bi bi-exclamation-circle" style={{ fontSize: '3rem', color: 'var(--color-text-muted)' }}></i>
                        <h2 style={{ color: 'var(--color-heading)', marginTop: '16px' }}>{notFoundTitle}</h2>
                        <p style={{ color: 'var(--color-text-muted)' }}>{notFoundSub}</p>
                        <Link to="/#experience" className="btn btn-primary" style={{ marginTop: '24px', display: 'inline-flex' }}>
                            <i className="bi bi-arrow-left"></i> <span>{backLabel}</span>
                        </Link>
                    </div>
                </section>
            )}
            {ProjectComp && <ProjectComp />}
            <Footer />
        </>
    )
}

