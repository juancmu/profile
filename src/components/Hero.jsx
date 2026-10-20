import { useEffect, useRef } from 'react'
import { useLang } from '../App'
import L from 'leaflet'

// Fix Leaflet default marker icon issue with Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

export default function Hero() {
    const { data, lang } = useLang()
    const { profile, navExp, navtop } = data
    const mapRef = useRef(null)
    const mapInstanceRef = useRef(null)
    const canvasRef = useRef(null)

    // ─── Leaflet Map ────────────────────────────────────────────────────────
    useEffect(() => {
        if (!mapRef.current) return
        
        // If map already exists, remove it before recreating
        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove()
            mapInstanceRef.current = null
        }

        const map = L.map(mapRef.current, {
            zoomControl: false,
            attributionControl: false,
        }).setView([4.6097, -74.0817], 5)
        mapInstanceRef.current = map

        L.control.zoom({ position: 'topright' }).addTo(map)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
            subdomains: 'abcd',
        }).addTo(map)

        fetch('/data/locations.geojson')
            .then(r => r.json())
            .then(geoData => {
                const layer = L.geoJSON(geoData, {
                    pointToLayer: (f, latlng) =>
                        L.circleMarker(latlng, {
                            radius: 6, fillColor: '#00f2ff', color: '#050510',
                            weight: 1, opacity: 1, fillOpacity: 0.8,
                        }),
                    onEachFeature: (f, layer) => {
                        const p = f.properties
                        const expData = data.work_experience?.find(w => w.id === p.id) || p
                        const position = expData.position || p.position
                        const company = expData.company || p.company
                        const location = expData.Location || p.raw_location
                        
                        const viewMore = lang === 'es' ? 'Ver proyecto' : 'View project'
                        layer.bindPopup(`
              <div>
                <h4 style="margin:0 0 4px;font-size:14px;color:#050510;">${position}</h4>
                <p style="margin:0 0 6px;font-size:12px;color:#444;font-weight:600;">${company}</p>
                <p style="margin:0 0 6px;font-size:11px;color:#666;">${location}</p>
                ${p.url ? `<a href="${p.url}" target="_blank" style="color:#0088ff;font-size:11px;">${viewMore}</a>` : ''}
              </div>`)
                    },
                }).addTo(map)
                map.fitBounds(layer.getBounds(), { padding: [30, 30] })
            })
            .catch(console.error)

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove()
                mapInstanceRef.current = null
            }
        }
    }, [data.work_experience, lang])

    // Canvas animation removed as per user request (switched to static mesh background)

    return (
        <section id="hero">
            <div className="container">
                <div className="hero-grid">
                    <div className="hero-text" data-aos="fade-up" data-aos-duration="800">
                        <p className="hero-coords">📍 4.7110° N, 74.0721° W — Bogotá, Colombia</p>
                        <h1 className="hero-name"><span>{profile.name}</span></h1>
                        <p className="hero-title">{profile.degree}</p>
                        <p className="hero-subtitle">{profile.postDegree}</p>
                        <p className="hero-tagline">{profile.tagline}</p>
                        <div className="hero-actions">
                            <a href="#experience" className="btn btn-primary">
                                <i className="bi bi-briefcase-fill"></i>
                                <span>{navExp.ep}</span>
                            </a>
                            <a href="#contact" className="btn btn-outline">
                                <i className="bi bi-envelope-fill"></i>
                                <span>{navtop.ct}</span>
                            </a>
                        </div>
                    </div>
                    <div className="hero-map-card" data-aos="fade-left" data-aos-duration="900" data-aos-delay="150">
                        <div id="map" ref={mapRef}></div>
                        <div className="hero-map-footer">
                            <span><span className="dot"></span> Professional Experience Map</span>
                            <span>Leaflet 1.9 · GeoJSON</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
