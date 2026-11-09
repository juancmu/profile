import { useLang } from '../App'

export default function About() {
    const { lang, data } = useLang()
    const { about, skills, tools } = data
    const projectLabel = lang === 'es' ? 'proyectos' : 'projects'

    return (
        <section id="about">
            <div className="container">
                <span className="section-label" data-aos="fade-up">{about.label}</span>
                <h2 className="section-title" data-aos="fade-up" data-aos-delay="50">{about.title}</h2>

                <div className="about-grid">
                    {/* Bio + skills */}
                    <div data-aos="fade-right" data-aos-duration="700">
                        <p className="about-bio">{about.bio1}</p>
                        <p className="about-bio">{about.bio2}</p>
                        <p className="skills-heading">{about.compHeading}</p>
                        <div className="skill-bars">
                            {skills.map((skill, i) => {
                                const pct = skill.total > 0 ? Math.round((skill.projects / skill.total) * 100) : 0
                                return (
                                    <div className="skill-bar" key={i}>
                                        <div className="skill-header">
                                            <span className="skill-name">{skill.name}</span>
                                            <div className="skill-count">
                                                <span className="skill-num">{skill.projects}</span>
                                                <span className="skill-label">{projectLabel}</span>
                                            </div>
                                        </div>
                                        <div className="skill-bar-track">
                                            <div className="skill-bar-fill" style={{ width: `${pct}%` }}></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Tools + GISP */}
                    <div data-aos="fade-left" data-aos-duration="700" data-aos-delay="100">
                        <p className="skills-heading">{about.toolsHeading}</p>
                        <div className="tools-grid">
                            {tools.map((tool, i) => (
                                <div className="tool-badge" key={i}>
                                    <i className={`bi ${tool.icon}`}></i> <span>{tool.name}</span>
                                </div>
                            ))}
                        </div>
                        <div className="glass-card" style={{ marginTop: '28px', padding: '20px 22px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <i className="bi bi-award-fill" style={{ fontSize: '1.4rem', color: 'var(--color-primary)' }}></i>
                                <h4 style={{ fontSize: '0.95rem', margin: 0 }}>{about.gispTitle}</h4>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>{about.gispDesc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
