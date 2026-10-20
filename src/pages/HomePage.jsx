import { useEffect } from 'react'
import AOS from 'aos'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Education from '../components/Education'
import About from '../components/About'
import Experience from '../components/Experience'
import Stats from '../components/Stats'
import Portfolio from '../components/Portfolio'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function HomePage() {
    useEffect(() => {
        AOS.init({ duration: 700, once: true, offset: 60 })
        const preloader = document.getElementById('preloader')
        setTimeout(() => preloader?.classList.add('hidden'), 500)
    }, [])

    return (
        <>
            <div id="preloader"><div className="preloader-ring"></div></div>
            <Navbar />
            <Hero />
            <Education />
            <About />
            <Experience />
            <Stats />
            <Portfolio />
            <Contact />
            <Footer />
        </>
    )
}
