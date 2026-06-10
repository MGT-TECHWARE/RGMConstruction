import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Building2,
  CalendarCheck,
  ChevronRight,
  ClipboardList,
  Clock,
  Hammer,
  Home,
  Mail,
  MapPin,
  Menu,
  Phone,
  Quote,
  Ruler,
  ShieldCheck,
  Star,
  TreePine,
  Users,
  Wrench,
  X,
} from 'lucide-react'
import logo from './assets/logo.png'
import heroHome from './assets/hero-home.webp'
import kitchenRemodel from './assets/kitchen-remodel.webp'
import projectAddition from './assets/project-addition.webp'
import projectFarmhouse from './assets/project-farmhouse.webp'
import projectOutdoor from './assets/project-outdoor.webp'
import './App.css'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

const services = [
  {
    title: 'Custom Homes',
    text: 'From first sketch to final walkthrough, we build homes tailored to the way your family lives.',
    icon: Home,
  },
  {
    title: 'Remodeling',
    text: 'Kitchens, basements, and whole-home updates handled with careful planning and clean execution.',
    icon: Hammer,
  },
  {
    title: 'Additions',
    text: 'Seamless new space that looks intentional, functions naturally, and respects the existing home.',
    icon: Building2,
  },
  {
    title: 'Decks & Outdoor',
    text: 'Durable outdoor rooms, covered patios, and deck systems built for Iowa seasons.',
    icon: TreePine,
  },
]

const benefits = [
  {
    title: 'Local & Family Owned',
    text: 'Rooted in Clarion and built around long-term relationships.',
    icon: Users,
  },
  {
    title: 'Quality Craftsmanship',
    text: 'Tight details, durable materials, and job sites managed with care.',
    icon: Wrench,
  },
  {
    title: 'On Time & On Budget',
    text: 'Clear expectations and steady communication from start to finish.',
    icon: Clock,
  },
]

const projects = [
  {
    title: 'Custom Home',
    place: 'Clarion, IA',
    image: heroHome,
    alt: 'Modern custom home exterior with warm dusk lighting',
  },
  {
    title: 'Modern Farmhouse',
    place: 'Wright County, IA',
    image: projectFarmhouse,
    alt: 'Modern farmhouse with porch and warm evening lights',
  },
  {
    title: 'Home Addition',
    place: 'Clarion, IA',
    image: projectAddition,
    alt: 'Finished home addition with stone and charcoal siding',
  },
  {
    title: 'Outdoor Living Space',
    place: 'Clarion, IA',
    image: projectOutdoor,
    alt: 'Covered outdoor living space with fireplace and deck lighting',
  },
]

const processSteps = [
  {
    title: 'Consult',
    text: 'We listen, inspect the site, and define the scope.',
    icon: Quote,
  },
  {
    title: 'Plan',
    text: 'You get a clear plan, selections path, and schedule.',
    icon: ClipboardList,
  },
  {
    title: 'Build',
    text: 'Our team manages the details and protects the job site.',
    icon: Hammer,
  },
  {
    title: 'Enjoy',
    text: 'We finish clean and stand behind the work.',
    icon: Home,
  },
]

const stats = [
  { value: '150+', label: 'Projects Completed', icon: Home },
  { value: '10+', label: 'Years Experience', icon: Users },
  { value: '5', label: 'Client Rating', icon: Star },
  { value: '100%', label: 'Local to Clarion, IA', icon: MapPin },
]

const reviews = [
  {
    quote:
      'RGM Construction exceeded our expectations from start to finish. The quality of their work is outstanding, and their communication was top-notch.',
    name: 'Jason & Amy P.',
    place: 'Clarion, Iowa',
  },
  {
    quote:
      'They treated our remodel like it mattered. The schedule was clear, the job site stayed clean, and every detail was handled with care.',
    name: 'Mark T.',
    place: 'Wright County, Iowa',
  },
  {
    quote:
      'Our addition looks like it was always part of the house. RGM gave us more space without losing the character of our home.',
    name: 'Sarah L.',
    place: 'Eagle Grove, Iowa',
  },
]

function useScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]')

    if (!('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -80px', threshold: 0.14 },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])
}

function Logo() {
  return (
    <a className="brand" href="#home" aria-label="RGM Construction home">
      <img className="brand-logo" src={logo} alt="RGM Construction — Clarion, Iowa" />
    </a>
  )
}

function SectionHeading({ eyebrow, title, text, align = 'center' }) {
  return (
    <div className={`section-heading section-heading--${align}`} data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  )
}

const CONTACT_EMAIL = 'info@rgmconstructionia.com'

const projectTypes = [
  'Custom Home',
  'Remodel',
  'Addition',
  'Deck / Outdoor Living',
  'Other',
]

const emptyContactForm = {
  name: '',
  email: '',
  phone: '',
  project: '',
  message: '',
  company: '',
}

function ContactForm() {
  const [form, setForm] = useState(emptyContactForm)
  const [errors, setErrors] = useState({})

  const update = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    // Honeypot: a real user never sees this field; bots fill it in.
    if (form.company) {
      return
    }

    const nextErrors = {}
    if (!form.name.trim()) {
      nextErrors.name = 'Please enter your name.'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Please enter a valid email.'
    }
    if (!form.message.trim()) {
      nextErrors.message = 'Please add a few project details.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      form.project ? `Project type: ${form.project}` : null,
      '',
      form.message,
    ]
      .filter((line) => line !== null)
      .join('\n')

    const subject = `Estimate request — ${form.name}`
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate data-reveal>
      <div className="field">
        <label htmlFor="cf-name">Name</label>
        <input
          id="cf-name"
          name="name"
          type="text"
          value={form.name}
          onChange={update}
          autoComplete="name"
        />
        {errors.name ? <span className="field-error">{errors.name}</span> : null}
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            value={form.email}
            onChange={update}
            autoComplete="email"
          />
          {errors.email ? <span className="field-error">{errors.email}</span> : null}
        </div>
        <div className="field">
          <label htmlFor="cf-phone">
            Phone <span>(optional)</span>
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={update}
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-project">Project type</label>
        <select id="cf-project" name="project" value={form.project} onChange={update}>
          <option value="">Select a project…</option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="cf-message">Project details</label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          value={form.message}
          onChange={update}
        />
        {errors.message ? <span className="field-error">{errors.message}</span> : null}
      </div>

      <div className="field-honeypot" aria-hidden="true">
        <label htmlFor="cf-company">Company</label>
        <input
          id="cf-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={update}
        />
      </div>

      <button className="btn btn-primary" type="submit">
        Send Estimate Request
        <ArrowRight size={19} aria-hidden="true" />
      </button>
      <p className="contact-form-note">
        Opens your email app with the details ready to send.
      </p>
    </form>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeReview, setActiveReview] = useState(0)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 12)
  const year = useMemo(() => new Date().getFullYear(), [])

  useScrollReveal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header-inner">
          <Logo />
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls="site-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
          <nav
            id="site-navigation"
            className={`site-nav ${menuOpen ? 'is-open' : ''}`}
            aria-label="Primary navigation"
          >
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="header-cta" href="#contact">
            Get a Free Estimate
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </header>

      <main>
        <section id="home" className="hero-section">
          <video
            className="hero-video"
            src="/hero.mp4"
            poster={heroHome}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <div className="hero-scrim" aria-hidden="true" />
          <div className="hero-texture" aria-hidden="true" />
          <div className="container hero-inner">
            <div className="hero-content">
              <p className="eyebrow">Clarion, Iowa Custom Builder</p>
              <h1>
                <span>Built</span>
                <span>to Last.</span>
              </h1>
              <p className="hero-copy">
                Quality craftsmanship. Honest service. Exceptional residential
                construction across Clarion and the surrounding area.
              </p>
              <div className="button-row">
                <a className="btn btn-primary" href="#projects">
                  View Our Work
                  <ArrowRight size={19} aria-hidden="true" />
                </a>
                <a className="btn btn-outline" href="#contact">
                  Get a Free Estimate
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section section-services">
          <div className="container">
            <SectionHeading
              eyebrow="Our Services"
              title="Residential work built with discipline."
              text="From custom homes to focused remodels, RGM handles the planning, material decisions, and construction details that protect your investment."
            />
            <div className="service-track" aria-label="Construction services">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <article className="service-card" key={service.title} data-reveal>
                    <div className="card-icon" aria-hidden="true">
                      <Icon />
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <a href="#contact">
                      Learn More
                      <ArrowRight size={17} aria-hidden="true" />
                    </a>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="about" className="section section-about">
          <div className="container about-grid">
            <div className="about-copy" data-reveal>
              <p className="eyebrow">About RGM Construction</p>
              <h2>Building more than homes. We build relationships.</h2>
              <p>
                RGM Construction is a trusted builder serving Clarion, Iowa,
                with high-quality residential construction, transparent
                communication, and pride in every project.
              </p>
              <a className="btn btn-primary" href="#process">
                Learn About Our Process
                <ArrowRight size={19} aria-hidden="true" />
              </a>
            </div>
            <figure className="about-photo-frame" data-reveal>
              <img
                src={kitchenRemodel}
                alt="Finished kitchen remodel with dark cabinetry and warm pendant lighting"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div className="benefit-list" data-reveal>
              {benefits.map((benefit) => {
                const Icon = benefit.icon
                return (
                  <article className="benefit-item" key={benefit.title}>
                    <span className="round-icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <div>
                      <h3>{benefit.title}</h3>
                      <p>{benefit.text}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="projects" className="section section-projects">
          <div className="container">
            <SectionHeading
              eyebrow="Featured Projects"
              title="A portfolio with clean lines and durable details."
              text="Representative residential work inspired by the finish level, materials, and regional character RGM brings to each project."
            />
            <div className="project-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.title} data-reveal>
                  <img src={project.image} alt={project.alt} loading="lazy" />
                  <div className="project-label">
                    <h3>{project.title}</h3>
                    <p>{project.place}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="section section-process">
          <div className="container process-grid">
            <div className="process-panel" data-reveal>
              <div className="panel-heading">
                <p className="eyebrow">The RGM Process</p>
                <h2>Clear steps. No guesswork.</h2>
              </div>
              <div className="steps">
                {processSteps.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <article className="step" key={step.title}>
                      <span className="step-icon" aria-hidden="true">
                        <Icon />
                      </span>
                      <div>
                        <strong>{index + 1}. {step.title}</strong>
                        <p>{step.text}</p>
                      </div>
                      {index < processSteps.length - 1 ? (
                        <ChevronRight className="step-arrow" aria-hidden="true" />
                      ) : null}
                    </article>
                  )
                })}
              </div>
            </div>

            <div className="numbers-panel" data-reveal>
              <div className="panel-heading">
                <p className="eyebrow">By The Numbers</p>
                <h2>Built on trust.</h2>
              </div>
              <div className="stat-grid">
                {stats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <article className="stat" key={stat.label}>
                      <Icon aria-hidden="true" />
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="section section-reviews">
          <div className="container review-card" data-reveal>
            <Quote className="quote-icon" aria-hidden="true" />
            <div className="review-stars" aria-label="Five-star review">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={18} fill="currentColor" aria-hidden="true" />
              ))}
            </div>
            <blockquote>
              <p>{reviews[activeReview].quote}</p>
              <footer>
                <strong>{reviews[activeReview].name}</strong>
                <span>{reviews[activeReview].place}</span>
              </footer>
            </blockquote>
            <div className="review-dots" aria-label="Choose a review">
              {reviews.map((review, index) => (
                <button
                  key={review.name}
                  type="button"
                  className={activeReview === index ? 'is-active' : ''}
                  aria-label={`Show review from ${review.name}`}
                  aria-pressed={activeReview === index}
                  onClick={() => setActiveReview(index)}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section section-contact">
          <div className="container contact-grid">
            <div className="contact-copy" data-reveal>
              <p className="eyebrow">Ready To Build?</p>
              <h2>Let's bring your vision to life.</h2>
              <p>
                Start with a free, no-obligation estimate for your custom home,
                remodel, addition, deck, or outdoor living project.
              </p>
              <div className="contact-direct">
                <a href="tel:+15155324334">
                  <Phone size={18} aria-hidden="true" />
                  515-532-4334
                </a>
                <a href={`mailto:${CONTACT_EMAIL}`}>
                  <Mail size={18} aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>
              Custom homes, remodeling, additions, decks, and outdoor spaces
              built for Clarion and surrounding Iowa communities.
            </p>
          </div>
          <div>
            <h2>Quick Links</h2>
            <ul>
              {navItems.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Serving</h2>
            <p>Clarion, Eagle Grove, Hampton, Belmond, Fort Dodge, and nearby communities.</p>
          </div>
          <div>
            <h2>Contact</h2>
            <address>
              <a href="tel:+15155324334">
                <Phone size={16} aria-hidden="true" />
                515-532-4334
              </a>
              <a href="mailto:info@rgmconstructionia.com">
                <Mail size={16} aria-hidden="true" />
                info@rgmconstructionia.com
              </a>
              <span>
                <MapPin size={16} aria-hidden="true" />
                Clarion, Iowa
              </span>
            </address>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Copyright {year} RGM Construction. All rights reserved.</span>
          <span className="footer-badges">
            <BadgeCheck size={16} aria-hidden="true" />
            <ShieldCheck size={16} aria-hidden="true" />
            <Award size={16} aria-hidden="true" />
            <CalendarCheck size={16} aria-hidden="true" />
            <Ruler size={16} aria-hidden="true" />
          </span>
        </div>
      </footer>
    </div>
  )
}

export default App
