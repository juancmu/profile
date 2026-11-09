import { useLang } from '../App'

export default function Stats() {
    const { data } = useLang()
    return (
        <section id="stats">
            <div className="container">
                <div className="stats-grid">
                    {data.stats.map((stat, i) => (
                        <div className="stat-item" data-aos="zoom-in" data-aos-delay={i * 80} key={i}>
                            <div className="stat-icon"><i className={`bi ${stat.icon}`}></i></div>
                            <div className="stat-text">
                                <h3 className="stat-number">{stat.target}+</h3>
                                <p className="stat-label">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
