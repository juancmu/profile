import { createContext, useContext, useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import JobPage from './pages/JobPage'
import FreelancerPage from './pages/FreelancerPage'
import F1CircuitsPage from './pages/F1CircuitsPage'
import GispTestPage from './pages/GispTestPage'

import enData from './i18n/lang-en.json'
import esData from './i18n/lang-es.json'

// ─── Language Context ─────────────────────────────────────────────────────────
export const LangContext = createContext(null)

export function useLang() {
  return useContext(LangContext)
}

// ─── Scroll to Hash Helper ───────────────────────────────────────────────────
function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        // Delay slightly to ensure content is rendered (AOS, etc.)
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState('es')
  const data = lang === 'en' ? enData : esData

  return (
    <LangContext.Provider value={{ lang, setLang, data }}>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/job/:id" element={<JobPage />} />
        <Route path="/freelancer" element={<FreelancerPage />} />
        <Route path="/freelancer/f1" element={<F1CircuitsPage />} />
        <Route path="/f1-circuits" element={<F1CircuitsPage />} />
        <Route path="/gisp-test" element={<GispTestPage />} />
      </Routes>
    </LangContext.Provider>
  )
}
