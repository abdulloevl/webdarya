import { useState, useEffect, Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  createBrowserRouter, 
  RouterProvider,
  Route,
  createRoutesFromElements,
  useLocation,
  Outlet
} from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import './i18n/config'

// Компоненты, которые нужны сразу
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'
import LoadingIndicator from './components/LoadingIndicator'

// Ленивая загрузка компонентов
const Hero = lazy(() => import('./components/Hero'))
const Services = lazy(() => import('./components/Services'))
const WhyUs = lazy(() => import('./components/WhyUs'))
const Technologies = lazy(() => import('./components/Technologies'))
const Portfolio = lazy(() => import('./components/Portfolio'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const FAQ = lazy(() => import('./components/FAQ'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))
const Privacy = lazy(() => import('./components/Privacy'))
const Security = lazy(() => import('./components/Security'))
const Terms = lazy(() => import('./components/Terms'))
const ScrollToTop = lazy(() => import('./components/ScrollToTop'))
const FloatingButton = lazy(() => import('./components/FloatingButton'))

// Компонент для отображения во время загрузки
const SectionLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-deep-800">
    <div className="w-16 h-16 border-4 border-ocean-400 border-t-transparent rounded-full animate-spin" />
  </div>
);

// Layout компонент для общей структуры
const Layout = ({ setIsRouteLoading }) => {
  const location = useLocation();

  useEffect(() => {
    setIsRouteLoading(true);
    const timer = setTimeout(() => setIsRouteLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location, setIsRouteLoading]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Suspense fallback={<SectionLoadingFallback />}>
        <Footer />
      </Suspense>
    </>
  );
};

// Главная страница
const HomePage = () => (
  <main className="relative">
    <Suspense fallback={<SectionLoadingFallback />}>
      <Hero />
    </Suspense>
    <Suspense fallback={<SectionLoadingFallback />}>
      <Services />
    </Suspense>
    <Suspense fallback={<SectionLoadingFallback />}>
      <WhyUs />
    </Suspense>
    <Suspense fallback={<SectionLoadingFallback />}>
      <Technologies />
    </Suspense>
    <Suspense fallback={<SectionLoadingFallback />}>
      <Portfolio />
    </Suspense>
    <Suspense fallback={<SectionLoadingFallback />}>
      <Testimonials />
    </Suspense>
    <Suspense fallback={<SectionLoadingFallback />}>
      <FAQ />
    </Suspense>
    <Suspense fallback={<SectionLoadingFallback />}>
      <Contact />
    </Suspense>
  </main>
);

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isRouteLoading, setIsRouteLoading] = useState(false)
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Web Darya",
    "url": "https://webdarya.com",
    "description": t('hero.description'),
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://webdarya.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://facebook.com/webdarya",
      "https://twitter.com/webdarya",
      "https://linkedin.com/company/webdarya"
    ],
    "provider": {
      "@type": "Organization",
      "name": "Web Darya",
      "logo": "https://webdarya.com/logo.png"
    },
    "inLanguage": currentLanguage
  }

  useEffect(() => {
    // Add smooth scrolling behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        document.querySelector(this.getAttribute('href'))?.scrollIntoView({
          behavior: 'smooth'
        })
      })
    })

    // Initial loading simulation
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout setIsRouteLoading={setIsRouteLoading} />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/privacy"
          element={
            <Suspense fallback={<SectionLoadingFallback />}>
              <Privacy />
            </Suspense>
          }
        />
        <Route
          path="/security"
          element={
            <Suspense fallback={<SectionLoadingFallback />}>
              <Security />
            </Suspense>
          }
        />
        <Route
          path="/terms"
          element={
            <Suspense fallback={<SectionLoadingFallback />}>
              <Terms />
            </Suspense>
          }
        />
      </Route>
    ),
    {
      future: {
        v7_relativeSplatPath: true
      }
    }
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Helmet>
        <title>Web Darya | {t('hero.title')}</title>
        <meta name="description" content={t('hero.description')} />
        <meta name="keywords" content="веб-разработка, web development, сайты, веб-сайты, разработка сайтов, landing page, business website, ecommerce, веб-студия, web agency" />
        <link rel="canonical" href="https://webdarya.com" />
        <meta property="og:title" content={`Web Darya | ${t('hero.title')}`} />
        <meta property="og:description" content={t('hero.description')} />
        <meta property="og:url" content="https://webdarya.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://webdarya.com/og-image.jpg" />
        <meta property="og:locale" content={currentLanguage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Web Darya | ${t('hero.title')}`} />
        <meta name="twitter:description" content={t('hero.description')} />
        <meta name="twitter:image" content="https://webdarya.com/twitter-image.jpg" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#111827" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      {isInitialLoading ? (
        <Preloader key="preloader" />
      ) : (
        <>
          {isRouteLoading && <LoadingIndicator key="loading" />}
          <Suspense fallback={<SectionLoadingFallback />}>
            <ScrollToTop />
            <FloatingButton />
            <RouterProvider router={router} />
          </Suspense>
        </>
      )}
    </div>
  );
}

export default App;
