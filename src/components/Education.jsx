import { useLang } from '../App'

export default function Education() {
    const { data } = useLang()
    return (
        <section id="education">
            <div className="container">
                <span className="section-label" data-aos="fade-up">{data.navtop.ed}</span>
                <h2 className="section-title" data-aos="fade-up" data-aos-delay="50">{data.navtop.ed}</h2>
                <div className="timeline" id="education-timeline" data-aos="fade-up" data-aos-delay="150">
                    {data.education.map((edu, i) => (
                        <div className="timeline-item active" key={i}>
                            <div className="timeline-dot" style={{ background: 'var(--color-primary)' }}></div>
                            <div className="timeline-header">
                                <div className="timeline-title-wrap">
                                    <h4>{edu.degree}</h4>
                                    {edu.url ? (
                                        <a href={edu.url} target="_blank" rel="noreferrer" className="timeline-company-link">
                                            {edu.institution} <i className="bi bi-box-arrow-up-right" style={{ fontSize: '0.75rem' }}></i>
                                        </a>
                                    ) : (
                                        <span className="timeline-company">{edu.institution}</span>
                                    )}
                                </div>
                            </div>
                            <div className="timeline-body">
                                <div className="timeline-desc">{edu.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
