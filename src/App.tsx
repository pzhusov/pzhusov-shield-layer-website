import { useState, useEffect } from 'react'
import {
  Menu,
  X,
  TrendingUp,
  Bitcoin,
  LineChart,
  BarChart3,
  FileText,
  Briefcase,
  Scale,
  Handshake,
  MapPin,
  Mail,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Brain,
  PieChart,
  Target,
  Users
} from 'lucide-react'

// Logo Component with actual logo image and glow effect
const Logo = () => (
  <div className="flex items-center gap-3 group">
    <div className="relative">
      {/* Outer glow effect */}
      <div className="absolute -inset-3 bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-blue opacity-0 group-hover:opacity-60 blur-2xl transition-all duration-500 group-hover:duration-200" />
      {/* Inner glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyber-blue to-cyber-cyan opacity-0 group-hover:opacity-80 blur-md transition-all duration-300" />
      {/* Logo image with enhanced glow on hover */}
      <img
        src="/Logo.jpg"
        alt="Shield Layer Capital"
        className="relative h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] group-hover:drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]"
      />
    </div>
  </div>
)

// Navigation Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="focus:outline-none">
          <Logo />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors duration-200 font-body text-sm tracking-wide"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2.5 bg-gradient-to-r from-cyber-blue to-cyber-cyan text-white font-body font-medium text-sm rounded-lg hover:opacity-90 transition-all duration-200 glow-primary"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass border-t border-cyber-border">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-body py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="px-6 py-3 bg-gradient-to-r from-cyber-blue to-cyber-cyan text-white font-body font-medium text-sm rounded-lg text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

// Hero Section
const Hero = () => (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background Effects */}
    <div className="absolute inset-0 bg-grid" />
    <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-cyber-blue/10 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-cyber-cyan/10 rounded-full blur-3xl" />

    <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyber-blue/30 bg-cyber-blue/10 mb-8">
        <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
        <span className="text-cyber-cyan font-body text-sm">Dubai Based Company</span>
      </div>

      <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
        <span className="text-white">Expert</span>{' '}
        <span className="gradient-text">Investment Research</span>
        <br />
        <span className="text-white">& Strategic Consulting</span>
      </h1>

      <p className="text-gray-400 font-body text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
        Shield Layer Capital delivers in-depth market research, cryptocurrency business analysis,
        and comprehensive strategic consulting. Based in Dubai, we help investors make informed decisions.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="#contact"
          className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyber-blue to-cyber-cyan text-white font-body font-semibold rounded-lg hover:opacity-90 transition-all duration-300 glow-primary"
        >
          Start Your Journey
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
        <a
          href="#services"
          className="flex items-center gap-2 px-8 py-4 border border-gray-600 text-white font-body font-semibold rounded-lg hover:border-cyber-blue hover:text-cyber-blue transition-all duration-300"
        >
          Explore Services
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-cyber-border">
        {[
          { value: '2024', label: 'Established' },
          { value: 'Dubai', label: 'Headquarters' },
          { value: 'Global', label: 'Coverage' },
          { value: '24/7', label: 'Support' },
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className="font-heading text-3xl font-bold gradient-text mb-2">{stat.value}</div>
            <div className="text-gray-500 font-body text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

// About Section
const About = () => (
  <section id="about" className="relative py-24 bg-cyber-surface">
    <div className="absolute inset-0 bg-dots opacity-50" />

    <div className="relative z-10 max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/10 mb-6">
            <Brain className="w-4 h-4 text-cyber-cyan" />
            <span className="text-cyber-cyan font-body text-sm">About Us</span>
          </div>

          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            Data-Driven Insights for{' '}
            <span className="gradient-text">Smart Investments</span>
          </h2>

          <p className="text-gray-400 font-body text-lg leading-relaxed mb-8">
            Shield Layer Capital - FZCO is a premier investment research and strategic consulting firm based in Dubai Silicon Oasis.
            We specialize in deep market research, cryptocurrency analysis, and comprehensive consulting services that empower
            our clients to make informed investment decisions.
          </p>

          <div className="space-y-4">
            {[
              'In-depth stock market research and analysis',
              'Cryptocurrency and blockchain business consulting',
              'Strategic consulting for institutional investors',
              'Comprehensive financial modeling services',
              'Tender structuring and advisory',
              'Dubai-based with global market coverage'
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyber-cyan flex-shrink-0" />
                <span className="text-gray-300 font-body">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 border border-cyber-blue/30 rounded-lg" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-cyber-cyan/30 rounded-lg" />

          <div className="relative bg-cyber-card border border-cyber-border rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4">
                <LineChart className="w-8 h-8 text-cyber-blue mx-auto mb-3" />
                <div className="text-white font-heading font-semibold">Research</div>
                <div className="text-cyber-cyan font-body text-sm">Deep Analysis</div>
              </div>
              <div className="text-center p-4">
                <Brain className="w-8 h-8 text-cyber-cyan mx-auto mb-3" />
                <div className="text-white font-heading font-semibold">Strategy</div>
                <div className="text-cyber-cyan font-body text-sm">Expert Advisory</div>
              </div>
              <div className="text-center p-4">
                <Bitcoin className="w-8 h-8 text-cyber-blue mx-auto mb-3" />
                <div className="text-white font-heading font-semibold">Crypto</div>
                <div className="text-cyber-cyan font-body text-sm">Business Analysis</div>
              </div>
              <div className="text-center p-4">
                <MapPin className="w-8 h-8 text-cyber-cyan mx-auto mb-3" />
                <div className="text-white font-heading font-semibold">Location</div>
                <div className="text-cyber-cyan font-body text-sm">Dubai, UAE</div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-cyber-border">
              <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>IFZA Properties, Dubai Silicon Oasis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

// Services Section
const Services = () => {
  const services = [
    {
      icon: LineChart,
      title: 'Deep Market Research',
      description: 'Comprehensive research and analysis of stock markets, financial instruments, and investment opportunities. We provide actionable insights for informed decision-making.',
      features: ['Stock Market Analysis', 'Sector Research', 'Company Due Diligence', 'Investment Opportunity Assessment']
    },
    {
      icon: Bitcoin,
      title: 'Crypto Business Consulting',
      description: 'Specialized advisory services for cryptocurrency businesses, blockchain projects, and digital asset investments. Navigate the crypto landscape with expert guidance.',
      features: ['Crypto Market Analysis', 'Blockchain Project Evaluation', 'Tokenomics Advisory', 'Regulatory Compliance Guidance']
    },
    {
      icon: Briefcase,
      title: 'Strategic Consulting',
      description: 'Expert strategic advisory for businesses and investors. We help develop winning strategies that drive growth and maximize value.',
      features: ['Business Strategy Development', 'Market Entry Strategy', 'Corporate Restructuring', 'Growth Planning']
    },
    {
      icon: PieChart,
      title: 'Market Analytics',
      description: 'Advanced market analytics and data-driven insights. Transform complex market data into clear, actionable intelligence.',
      features: ['Quantitative Analysis', 'Risk Modeling', 'Portfolio Analytics', 'Performance Benchmarking']
    },
    {
      icon: FileText,
      title: 'Financial Modeling',
      description: 'Professional financial modeling and forecasting services. Accurate models that support strategic decision-making and investor communications.',
      features: ['DCF Valuation Models', 'M&A Models', 'Budget Forecasting', 'Scenario Analysis']
    },
    {
      icon: Scale,
      title: 'Tender Structuring',
      description: 'Expert consulting for tender processes and procurement structuring. Ensure compliance and maximize value in your procurement activities.',
      features: ['Tender Documentation', 'Evaluation Framework', 'Compliance Advisory', 'Process Optimization']
    }
  ]

  return (
    <section id="services" className="relative py-24 bg-cyber-dark">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyber-blue/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-blue/30 bg-cyber-blue/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyber-blue" />
            <span className="text-cyber-blue font-body text-sm">Our Services</span>
          </div>

          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            Comprehensive{' '}
            <span className="gradient-text">Consulting Solutions</span>
          </h2>

          <p className="text-gray-400 font-body text-lg max-w-2xl mx-auto">
            We deliver expert research and consulting services across global markets, helping our clients achieve
            superior investment outcomes through data-driven insights and strategic advisory.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-cyber-card border border-cyber-border rounded-2xl p-8 hover:border-cyber-blue/50 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-cyber-blue/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyber-blue/20 to-cyber-cyan/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-cyber-cyan" />
                </div>

                <h3 className="font-heading text-xl font-semibold text-white mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-400 font-body leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="space-y-3">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2 text-gray-300 font-body text-sm">
                      <ChevronRight className="w-4 h-4 text-cyber-blue" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://formspree.io/f/mzdalwpr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" className="relative py-24 bg-cyber-dark">
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/10 mb-6">
            <Mail className="w-4 h-4 text-cyber-cyan" />
            <span className="text-cyber-cyan font-body text-sm">Get In Touch</span>
          </div>

          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            Let's Build Something{' '}
            <span className="gradient-text">Extraordinary</span>
          </h2>

          <p className="text-gray-400 font-body text-lg max-w-2xl mx-auto">
            Ready to elevate your investment strategy? Contact us today and let's discuss how we can help you achieve your financial goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-cyber-card border border-cyber-border rounded-2xl p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-cyber-cyan/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-cyber-cyan" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400 font-body">Thank you for reaching out. We'll get back to you soon.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-cyber-cyan hover:text-white font-body transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 font-body text-sm mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-cyber-surface border border-cyber-border rounded-lg text-white font-body focus:border-cyber-blue focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-body text-sm mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-cyber-surface border border-cyber-border rounded-lg text-white font-body focus:border-cyber-blue focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-body text-sm mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-cyber-surface border border-cyber-border rounded-lg text-white font-body focus:border-cyber-blue focus:outline-none transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="research">Market Research</option>
                    <option value="crypto">Crypto Consulting</option>
                    <option value="strategy">Strategic Consulting</option>
                    <option value="analytics">Market Analytics</option>
                    <option value="modeling">Financial Modeling</option>
                    <option value="tender">Tender Structuring</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-body text-sm mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-cyber-surface border border-cyber-border rounded-lg text-white font-body focus:border-cyber-blue focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-cyber-blue to-cyber-cyan text-white font-body font-semibold rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed glow-primary"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-cyber-card border border-cyber-border rounded-2xl p-8">
              <h3 className="font-heading text-xl font-semibold text-white mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyber-blue/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-cyber-cyan" />
                  </div>
                  <div>
                    <div className="text-gray-500 font-body text-sm mb-1">Office Address</div>
                    <div className="text-white font-body">
                      IFZA Properties<br />
                      Dubai Silicon Oasis<br />
                      Dubai, UAE
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyber-cyan/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-cyber-cyan" />
                  </div>
                  <div>
                    <div className="text-gray-500 font-body text-sm mb-1">Email</div>
                    <div className="text-white font-body">md@shieldlayer.net</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyber-blue/20 to-cyber-cyan/20 border border-cyber-blue/30 rounded-2xl p-8">
              <h3 className="font-heading text-xl font-semibold text-white mb-4">Business Hours</h3>
              <div className="space-y-2 text-gray-300 font-body">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-cyber-cyan">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-gray-500">Closed</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-gray-500">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer
const Footer = () => (
  <footer className="relative py-16 bg-cyber-surface border-t border-cyber-border">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2">
          <Logo />
          <p className="text-gray-400 font-body mt-4 max-w-md">
            Shield Layer Capital - Your trusted partner for investment research, cryptocurrency consulting,
            and strategic advisory services in Dubai and globally.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-3">
            {['Home', 'About', 'Services', 'Contact'].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-400 hover:text-cyber-cyan font-body transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Services</h4>
          <ul className="space-y-3">
            {['Market Research', 'Crypto Consulting', 'Strategic Advisory', 'Financial Modeling'].map((link) => (
              <li key={link}>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-cyber-cyan font-body transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-cyber-border flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-gray-500 font-body text-sm">
          © 2026 Shield Layer Capital - FZCO. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <span className="text-gray-500 font-body text-sm">
            Licensed by IFZA
          </span>
          <span className="text-gray-600 font-body text-sm">|</span>
          <span className="text-gray-500 font-body text-sm">
            License #50809
          </span>
        </div>
      </div>
    </div>
  </footer>
)

// Main App
function App() {
  return (
    <div className="min-h-screen bg-cyber-dark">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
