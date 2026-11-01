import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../App'

export default function MinardMapPage() {
    const { lang, setLang } = useLang()
    const [isLoading, setIsLoading] = useState(true)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const iframeRef = useRef(null)
    const [initialLang] = useState(lang)

    useEffect(() => {
        const preloader = document.getElementById('preloader')
        setTimeout(() => preloader?.classList.add('hidden'), 300)
    }, [])

    useEffect(() => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
                { type: 'MINARD_LANGUAGE_CHANGE', lang },
                '*'
            )
        }
    }, [lang])

    const handleIframeLoad = () => {
        setIsLoading(false)
        if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
                { type: 'MINARD_LANGUAGE_CHANGE', lang },
                '*'
            )
        }
    }

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`)
            })
            setIsFullscreen(true)
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
                setIsFullscreen(false)
            }
        }
    }

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }
        document.addEventListener('fullscreenchange', handleFullscreenChange)
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }, [])

    const backLabel = lang === 'es' ? 'Volver a Freelancer' : 'Back to Freelancer'
    const fullscreenLabel = lang === 'es'
        ? (isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa')
        : (isFullscreen ? 'Exit Fullscreen' : 'Fullscreen')
    const title = lang === 'es'
        ? 'Carte Figurative — Mapa de Minard'
        : 'Carte Figurative — Minard Map'
    const subtitle = lang === 'es'
        ? 'Campaña de Napoleón en Rusia 1812 • Cartografía Histórica Interactiva'
        : "Napoleon's 1812 Russian Campaign • Interactive Historical Cartography"

    return (
        <div className="f1-page-wrapper">
            {/* Top Navigation Control Bar */}
            <header className="f1-page-header">
                <div className="f1-header-left">
                    <Link to="/freelancer" className="f1-back-btn" title={backLabel}>
                        <i className="bi bi-arrow-left"></i>
                        <span>{backLabel}</span>
                    </Link>

                    <div className="f1-header-divider"></div>

                    <div className="f1-brand-group">
                        <span className="f1-racing-badge">
                            <i className="bi bi-compass-fill"></i> 1812
                        </span>
                        <div className="f1-titles">
                            <h1 className="f1-main-title">{title}</h1>
                            <span className="f1-sub-title">{subtitle}</span>
                        </div>
                    </div>
                </div>

                <div className="f1-header-right">
                    {/* Language Switcher */}
                    <div className="f1-lang-switch">
                        <button
                            className={`f1-lang-btn ${lang === 'es' ? 'active' : ''}`}
                            onClick={() => setLang('es')}
                            title="Español"
                        >
                            ES
                        </button>
                        <span className="f1-lang-sep">|</span>
                        <button
                            className={`f1-lang-btn ${lang === 'en' ? 'active' : ''}`}
                            onClick={() => setLang('en')}
                            title="English"
                        >
                            EN
                        </button>
                    </div>

                    {/* Fullscreen Button */}
                    <button
                        className="f1-icon-action-btn"
                        onClick={toggleFullscreen}
                        title={fullscreenLabel}
                        aria-label={fullscreenLabel}
                    >
                        <i className={`bi ${isFullscreen ? 'bi-fullscreen-exit' : 'bi-arrows-fullscreen'}`}></i>
                    </button>
                </div>
            </header>

            {/* Iframe Viewport Container */}
            <main className="f1-iframe-container">
                {isLoading && (
                    <div className="f1-loading-overlay">
                        <div className="f1-loading-spinner"></div>
                        <div className="f1-loading-text">
                            <span>🗺️</span> {lang === 'es' ? 'Cargando Mapa de Minard (1812)...' : 'Loading Minard Map (1812)...'}
                        </div>
                    </div>
                )}
                <iframe
                    ref={iframeRef}
                    src={`/freelancer/MINARD/index.html?lang=${initialLang}`}
                    title="Carte Figurative — Napoleon's 1812 Russian Campaign (Minard Map)"
                    className="f1-app-iframe"
                    onLoad={handleIframeLoad}
                    allow="fullscreen; clipboard-write"
                />
            </main>

            {/* Scoped Page Styles */}
            <style>{`
                .f1-page-wrapper {
                    display: flex;
                    flex-direction: column;
                    width: 100vw;
                    height: 100vh;
                    overflow: hidden;
                    background: #080c14;
                    color: #fff;
                    font-family: var(--font-body, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
                }

                .f1-page-header {
                    height: 60px;
                    min-height: 60px;
                    background: rgba(10, 15, 30, 0.95);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 20px;
                    z-index: 100;
                }

                .f1-header-left {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .f1-back-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.88rem;
                    font-weight: 600;
                    color: var(--color-text-muted, #94a3b8);
                    text-decoration: none;
                    padding: 7px 14px;
                    border-radius: 8px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    background: rgba(255, 255, 255, 0.03);
                    transition: all 0.25s ease;
                }

                .f1-back-btn:hover {
                    color: #fff;
                    border-color: rgba(56, 189, 248, 0.5);
                    background: rgba(56, 189, 248, 0.1);
                    transform: translateX(-2px);
                }

                .f1-header-divider {
                    width: 1px;
                    height: 28px;
                    background: rgba(255, 255, 255, 0.12);
                }

                .f1-brand-group {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .f1-racing-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 0.85rem;
                    font-weight: 800;
                    letter-spacing: 0.05em;
                    background: #e10600;
                    color: #fff;
                    padding: 4px 10px;
                    border-radius: 6px;
                    box-shadow: 0 2px 10px rgba(225, 6, 0, 0.4);
                }

                .f1-titles {
                    display: flex;
                    flex-direction: column;
                }

                .f1-main-title {
                    margin: 0;
                    font-size: 1.15rem;
                    font-weight: 700;
                    letter-spacing: -0.01em;
                    color: #fff;
                    line-height: 1.2;
                }

                .f1-sub-title {
                    font-size: 0.75rem;
                    color: #64748b;
                    font-weight: 500;
                }

                .f1-header-right {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .f1-lang-switch {
                    display: flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 6px;
                    padding: 3px 8px;
                    gap: 6px;
                }

                .f1-lang-btn {
                    background: none;
                    border: none;
                    color: #64748b;
                    font-size: 0.78rem;
                    font-weight: 700;
                    cursor: pointer;
                    padding: 2px 4px;
                    transition: color 0.2s ease;
                }

                .f1-lang-btn.active {
                    color: #38bdf8;
                }

                .f1-lang-sep {
                    color: rgba(255, 255, 255, 0.15);
                    font-size: 0.75rem;
                }

                .f1-icon-action-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    background: rgba(255, 255, 255, 0.03);
                    color: #94a3b8;
                    cursor: pointer;
                    text-decoration: none;
                    transition: all 0.2s ease;
                    font-size: 0.95rem;
                }

                .f1-icon-action-btn:hover {
                    color: #fff;
                    border-color: rgba(56, 189, 248, 0.5);
                    background: rgba(56, 189, 248, 0.1);
                }

                .f1-iframe-container {
                    position: relative;
                    flex: 1;
                    width: 100%;
                    height: calc(100vh - 60px);
                    background: #080c14;
                    overflow: hidden;
                }

                .f1-app-iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                    display: block;
                }

                .f1-loading-overlay {
                    position: absolute;
                    inset: 0;
                    background: #080c14;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 16px;
                    z-index: 50;
                }

                .f1-loading-spinner {
                    width: 44px;
                    height: 44px;
                    border: 3px solid rgba(225, 6, 0, 0.15);
                    border-top-color: #e10600;
                    border-radius: 50%;
                    animation: f1Spin 0.8s linear infinite;
                }

                .f1-loading-text {
                    font-size: 0.95rem;
                    color: #94a3b8;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                @keyframes f1Spin {
                    to { transform: rotate(360deg); }
                }

                @media (max-width: 768px) {
                    .f1-page-header {
                        padding: 0 12px;
                        height: 54px;
                        min-height: 54px;
                    }

                    .f1-back-btn span {
                        display: none;
                    }

                    .f1-sub-title {
                        display: none;
                    }

                    .f1-main-title {
                        font-size: 1rem;
                    }

                    .f1-header-divider {
                        display: none;
                    }

                    .f1-iframe-container {
                        height: calc(100vh - 54px);
                    }
                }
            `}</style>
        </div>
    )
}
