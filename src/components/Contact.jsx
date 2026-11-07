import { useState } from 'react'
import { useLang } from '../App'

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/jcmunozcastaneda@gmail.com'

export default function Contact() {
    const { data } = useLang()
    const { contact, form } = data
    const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formEl = e.currentTarget
        const fd = new FormData(formEl)

        // Honeypot spam check
        if (fd.get('_honey')) return

        const name = fd.get('name')
        const email = fd.get('email')
        const subject = fd.get('subject')
        const message = fd.get('message')

        setStatus('sending')

        try {
            const response = await fetch(FORMSUBMIT_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    subject,
                    message,
                    _replyto: email,
                    _subject: `[Portfolio Contact] ${subject}`,
                    _template: 'table',
                    _captcha: 'false',
                }),
            })

            const result = await response.json()

            if (response.ok && result.success !== 'false' && result.success !== false) {
                setStatus('success')
                formEl.reset()
            } else {
                setStatus('error')
            }
        } catch {
            setStatus('error')
        }
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
                                <a href="https://www.linkedin.com/in/jcmunozc" target="_blank" rel="noreferrer">linkedin.com/in/jcmunozc</a>
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
                            <a href="https://www.linkedin.com/in/jcmunozc" target="_blank" rel="noreferrer" className="social-link" title="LinkedIn"><i className="bi bi-linkedin"></i></a>
                            <a href="https://github.com/" target="_blank" rel="noreferrer" className="social-link" title="GitHub"><i className="bi bi-github"></i></a>
                            <a href="mailto:jcmunozcastaneda@gmail.com" className="social-link" title="Email"><i className="bi bi-envelope-fill"></i></a>
                        </div>
                    </div>

                    <div data-aos="fade-left" data-aos-duration="700" data-aos-delay="100">
                        <form
                            className="contact-form"
                            action="https://formsubmit.co/jcmunozcastaneda@gmail.com"
                            method="POST"
                            onSubmit={handleSubmit}
                            onInput={() => {
                                if (status === 'success' || status === 'error') {
                                    setStatus('idle')
                                }
                            }}
                        >
                            {/* Honeypot spam protection */}
                            <input
                                type="text"
                                name="_honey"
                                className="visually-hidden"
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                            />
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_template" value="table" />

                            <div className="form-row">
                                <div>
                                    <label htmlFor="contact-name" className="visually-hidden">{form.name}</label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder={form.name}
                                        autoComplete="name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-email" className="visually-hidden">{form.email}</label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder={form.email}
                                        autoComplete="email"
                                        autoCorrect="off"
                                        autoCapitalize="off"
                                        spellCheck={false}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="contact-subject" className="visually-hidden">{form.subject}</label>
                                <input
                                    id="contact-subject"
                                    type="text"
                                    className="form-control"
                                    name="subject"
                                    placeholder={form.subject}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="contact-message" className="visually-hidden">{form.message}</label>
                                <textarea
                                    id="contact-message"
                                    className="form-control"
                                    name="message"
                                    placeholder={form.message}
                                    required
                                ></textarea>
                            </div>

                            <div className="form-actions">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={status === 'sending'}
                                >
                                    <i className={status === 'sending' ? 'bi bi-hourglass-split' : 'bi bi-send-fill'}></i>{' '}
                                    <span>{status === 'sending' ? form.sending : form.submit}</span>
                                </button>

                                <div aria-live="polite" className="form-status-wrap">
                                    {status === 'success' && (
                                        <p className="form-feedback form-feedback-success">
                                            <i className="bi bi-check-circle-fill"></i> {form.success}
                                        </p>
                                    )}
                                    {status === 'error' && (
                                        <p className="form-feedback form-feedback-error">
                                            <i className="bi bi-exclamation-triangle-fill"></i> {form.error}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
