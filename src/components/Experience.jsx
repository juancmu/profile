import { Link } from 'react-router-dom'
import { useLang } from '../App'

export default function Experience() {
    const { lang, data } = useLang()
    const viewMore = lang === 'es' ? 'ver más' : 'view more'

    return (
        <section id="experience">
            <div className="container">
                <span className="section-label" data-aos="fade-up">Career</span>
                <h2 className="section-title" data-aos="fade-up" data-aos-delay="50">{data.navExp.ep}</h2>
                <div className="timeline" id="experience-timeline" data-aos="fade-up" data-aos-delay="150">
                    {data.work_experience.map((job) => (
                        <div className="timeline-item active" key={job.id}>
                            <div className="timeline-dot"></div>
                            <div className="timeline-header">
                                <div className="timeline-title-wrap">
                                    <h4>{job.position}</h4>
                                    <span className="timeline-company">{job.company}</span>
                                </div>
                                <div className="timeline-meta">
                                    <span className="timeline-period">{job.period}</span>
                                    <Link to={`/job/${job.id}`} className="timeline-link" target="_blank">{viewMore}</Link>
                                </div>
                            </div>
                            <div className="timeline-body">
                                <div className="timeline-desc">{job.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
