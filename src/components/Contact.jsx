import { useLang } from '../App'

export default function Contact() {
    const { data } = useLang()
    const { contact, form } = data

    const handleSubmit = (e) => {
        e.preventDefault()
        const fd = new FormData(e.target)
        const subject = fd.get('subject')
        const body = `Name: ${fd.get('name')}\nEmail: ${fd.get('email')}\n\n${fd.get('message')}`
        window.location.href = `mailto:jcmunozcastaneda@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        e.target.reset()
    }

    return (
        <section id="contact">
            <div className="container">
                <span className="section-label" data-aos="fade-up">{contact.label}</span>
                <h2 className="section-title" data-aos="fade-up" data-aos-delay="50">{contact.title}</h2>
                <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">{contact.subtitle}</p>

                <div className="contact-grid">
                    <div data-aos="fade-right" data-aos-duration="700">
                        <div className="contact-info-item">
                            <div className="contact-icon"><i className="bi bi-geo-alt-fill"></i></div>
                            <div><h4>{contact.locHeader}</h4><p>{contact.loc}</p></div>
                        </div>
                        <div className="contact-info-item">
                            <div className="contact-icon"><i className="bi bi-envelope-fill"></i></div>
                            <div>
                                <h4>{contact.emailHeader}</h4>
                                <a href="mailto:jcmunozcastaneda@gmail.com">jcmunozcastaneda@gmail.com</a>
                            </div>
                        </div>
                        <div className="contact-info-item">
                            <div className="contact-icon"><i className="bi bi-linkedin"></i></div>
                            <div>
                                <h4>{contact.liHeader}</h4>
                                <a href="https://www.linkedin.com/in/jcmunoz" target="_blank" rel="noreferrer">linkedin.com/in/jcmunoz</a>
                            </div>
                        </div>
                        <div className="contact-info-item">
                            <div className="contact-icon"><i className="bi bi-globe2"></i></div>
                            <div>
                                <h4>{contact.gvHeader}</h4>
                                <a href="https://cfro.geovisor.site/" target="_blank" rel="noreferrer">cfro.geovisor.site</a>
                            </div>
                        </div>
                        <div className="social-links">
                            <a href="https://www.linkedin.com/in/jcmunoz" target="_blank" rel="noreferrer" className="social-link" title="LinkedIn"><i className="bi bi-linkedin"></i></a>
                            <a href="https://github.com/" target="_blank" rel="noreferrer" className="social-link" title="GitHub"><i className="bi bi-github"></i></a>
                            <a href="mailto:jcmunozcastaneda@gmail.com" className="social-link" title="Email"><i className="bi bi-envelope-fill"></i></a>
                        </div>
                    </div>

                    <div data-aos="fade-left" data-aos-duration="700" data-aos-delay="100">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <input type="text" className="form-control" name="name" placeholder={form.name} required />
                                <input type="email" className="form-control" name="email" placeholder={form.email} required />
                            </div>
                            <input type="text" className="form-control" name="subject" placeholder={form.subject} required />
                            <textarea className="form-control" name="message" placeholder={form.message} required></textarea>
                            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                                <i className="bi bi-send-fill"></i> <span>{form.submit}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
