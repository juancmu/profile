import { useState } from 'react'
import { useLang } from '../App'

export default function Portfolio() {
    const { lang, data } = useLang()
    const { portfolio } = data
    const [activeFilter, setActiveFilter] = useState('all')
    const allLabel = lang === 'es' ? 'Todos' : 'All'

    const filters = [
        { key: 'all', label: allLabel },
        ...Object.entries(portfolio.filters)
            .filter(([k]) => k !== 'all')
            .map(([key, label]) => ({ key, label }))
    ]

    const visible = portfolio.items.filter(item =>
        activeFilter === 'all' || (item.cat || '').includes(activeFilter)
    )

    return (
        <section id="portfolio">
            <div className="container">
                <span className="section-label" data-aos="fade-up">{portfolio.label}</span>
                <h2 className="section-title" data-aos="fade-up" data-aos-delay="50">{portfolio.title}</h2>
                <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">{portfolio.subtitle}</p>

                <div className="portfolio-filters" data-aos="fade-up" data-aos-delay="150">
                    {filters.map(f => (
                        <button
                            key={f.key}
                            className={`pf-btn${activeFilter === f.key ? ' active' : ''}`}
                            onClick={() => setActiveFilter(f.key)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                <div className="portfolio-grid" data-aos="fade-up" data-aos-delay="200">
                    {visible.map((item, i) => (
                        <div className="pf-card" key={i}>
                            <div className="pf-img-wrap">
                                <img src={item.img} alt={item.title} loading="lazy" />
                                <div className="pf-overlay">
                                    <a href={item.img} target="_blank" rel="noreferrer" title="View"><i className="bi bi-zoom-in"></i></a>
                                    {item.url && (
                                        <a href={item.url} target="_blank" rel="noreferrer" title="Open project"><i className="bi bi-box-arrow-up-right"></i></a>
                                    )}
                                </div>
                            </div>
                            <div className="pf-info">
                                <h4>{item.title}</h4>
                                <span className="tag">{item.tag}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
