import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowRight, Code2, Layers, Zap, Globe2, Shield, BarChart3,
  ChevronRight, Mail, MessageCircle, ExternalLink, Sparkles,
  Building2, Wrench, Package, CheckCircle2, Menu, X, Send, Loader2
} from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

/* ─── Intersection Observer hook ─────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Logo ────────────────────────────────────────────────────── */
function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const heights = { sm: 'h-7', md: 'h-8', lg: 'h-10' };
  return (
    <img
      src="/logos/inflexiumlabs.png"
      alt="InflexiumLabs"
      className={`${heights[size]} object-contain`}
    />
  );
}

/* ─── Nav ─────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Productos', href: '#productos' },
    { label: 'Por qué nosotros', href: '#nosotros' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contacto"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-all hover:shadow-lg hover:shadow-violet-500/25"
        >
          Hablemos <ArrowRight size={14} />
        </a>
        <button className="md:hidden text-gray-500 hover:text-gray-900" onClick={() => setMenuOpen(v => !v)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg px-6 py-4 space-y-3">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-gray-600 hover:text-gray-900 py-2 text-sm font-medium">
              {l.label}
            </a>
          ))}
          <a href="#contacto" onClick={() => setMenuOpen(false)} className="block w-full text-center px-4 py-3 rounded-lg bg-violet-600 text-white text-sm font-semibold">
            Hablemos
          </a>
        </div>
      )}
    </header>
  );
}

/* ─── Hero ────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-violet-400/20 blur-[130px] animate-glow-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[120px] animate-glow-pulse animate-delay-500 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-purple-300/10 blur-[160px] pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.05)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-xs font-semibold text-violet-700 mb-10 animate-fade-up opacity-0-init" style={{ animationFillMode: 'forwards' }}>
          <Sparkles size={12} className="text-violet-500" />
          Partner Oficial de Odoo · Uruguay & México
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-8 animate-fade-up opacity-0-init animate-delay-100" style={{ animationFillMode: 'forwards' }}>
          <span className="text-gray-900">Tecnología que</span>
          <br />
          <span className="gradient-text">transforma empresas</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12 animate-fade-up opacity-0-init animate-delay-200" style={{ animationFillMode: 'forwards' }}>
          Implementamos Odoo, desarrollamos software a medida y construimos productos digitales para que tu operación escale sin fricciones.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up opacity-0-init animate-delay-300" style={{ animationFillMode: 'forwards' }}>
          <a
            href="#contacto"
            className="group inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all glow-violet hover:scale-105"
          >
            Solicitar diagnóstico gratuito
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#productos"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white border border-gray-200 text-gray-700 hover:border-violet-300 hover:text-violet-700 text-sm font-semibold transition-all hover:scale-105 shadow-sm"
          >
            Ver productos <ChevronRight size={16} />
          </a>
        </div>

        {/* Floating stats */}
        <div className="mt-24 grid grid-cols-3 gap-4 max-w-2xl mx-auto animate-fade-up opacity-0-init animate-delay-500" style={{ animationFillMode: 'forwards' }}>
          {[
            { value: '80+', label: 'módulos Odoo' },
            { value: '2', label: 'países activos' },
            { value: '100%', label: 'soporte en español' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-2xl py-5 px-4 shadow-sm">
              <div className="text-2xl font-black gradient-text">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float text-gray-300">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-gray-300" />
        <span className="text-xs tracking-widest uppercase">scroll</span>
      </div>
    </section>
  );
}

/* ─── Trust Strip ─────────────────────────────────────────────── */
function TrustStrip() {
  const { ref, inView } = useInView(0.1);
  return (
    <section className="py-14 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-10">
          Certificaciones & Alianzas
        </p>
        <div
          ref={ref}
          className={`flex flex-wrap items-center justify-center gap-10 md:gap-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <img src="/logos/odoo-partner.png" alt="Odoo Official Partner" className="h-12 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
          <img src="/logos/cuti.png" alt="CUTI" className="h-10 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
          <div className="rounded-xl overflow-hidden grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
            <img src="/logos/antel.jpeg" alt="Antel Empresas Socio" className="h-12 object-contain" />
          </div>
          <div className="bg-gray-900 rounded-xl px-4 py-2 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
            <img src="/logos/uruguay-tech.png" alt="Uruguay Technology" className="h-8 object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Services ────────────────────────────────────────────────── */
const services = [
  {
    icon: <Layers size={24} />,
    color: 'violet',
    title: 'Implementación Odoo',
    desc: 'Configuramos y personalizamos Odoo a medida de tu operación. Migraciones, integraciones y capacitación incluidas.',
    tags: ['Odoo 17/18', 'Multiempresa', 'Migración'],
  },
  {
    icon: <Code2 size={24} />,
    color: 'blue',
    title: 'Desarrollo a medida',
    desc: 'Módulos custom, integraciones con APIs externas y soluciones específicas que Odoo base no cubre.',
    tags: ['Python', 'React', 'REST API'],
  },
  {
    icon: <Building2 size={24} />,
    color: 'cyan',
    title: 'ERP para construcción',
    desc: 'PreObra: sistema completo de presupuestación, control de obra y certificación sobre Odoo.',
    tags: ['PreObra', 'Obras', 'Uruguay'],
  },
  {
    icon: <BarChart3 size={24} />,
    color: 'violet',
    title: 'Business Intelligence',
    desc: 'Dashboards, KPIs y reportes personalizados conectados directamente a tu instancia Odoo.',
    tags: ['Dashboards', 'KPIs', 'Tiempo real'],
  },
  {
    icon: <Shield size={24} />,
    color: 'blue',
    title: 'Soporte & mantenimiento',
    desc: 'SLA garantizado, actualizaciones y soporte técnico en español para equipos en Uruguay y México.',
    tags: ['SLA', 'Soporte', 'Actualizaciones'],
  },
  {
    icon: <Globe2 size={24} />,
    color: 'cyan',
    title: 'Cloud & infraestructura',
    desc: 'Hosting, backup automático y gestión de servidores para tu instancia Odoo con uptime garantizado.',
    tags: ['Cloud', 'Backup', '99.9% uptime'],
  },
];

const colorMap: Record<string, string> = {
  violet: 'bg-gradient-to-br from-violet-50 to-white border-violet-150 hover:border-violet-300 hover:shadow-violet-50',
  blue:   'bg-gradient-to-br from-blue-50 to-white border-blue-150 hover:border-blue-300 hover:shadow-blue-50',
  cyan:   'bg-gradient-to-br from-cyan-50 to-white border-cyan-150 hover:border-cyan-300 hover:shadow-cyan-50',
};
const iconColorMap: Record<string, string> = {
  violet: 'text-violet-600 bg-violet-100',
  blue:   'text-blue-600 bg-blue-100',
  cyan:   'text-cyan-600 bg-cyan-100',
};
const tagColorMap: Record<string, string> = {
  violet: 'bg-violet-100 text-violet-700',
  blue:   'bg-blue-100 text-blue-700',
  cyan:   'bg-cyan-100 text-cyan-700',
};

function Services() {
  const { ref, inView } = useInView();
  return (
    <section id="servicios" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100 text-xs font-semibold text-violet-700 mb-6">
            <Wrench size={11} /> Servicios
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Todo lo que tu empresa<br />
            <span className="gradient-text">necesita para crecer</span>
          </h2>
          <p className="text-gray-500 max-w-xl text-lg">Desde la implementación hasta el soporte continuo, un solo equipo que conoce tu operación.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s, delay }: { s: typeof services[0]; delay: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`rounded-2xl p-7 border shadow-sm ${colorMap[s.color]} transition-all duration-700 hover:-translate-y-1 hover:shadow-md ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${iconColorMap[s.color]}`}>
        {s.icon}
      </div>
      <h3 className="text-gray-900 font-bold text-lg mb-2">{s.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.desc}</p>
      <div className="flex flex-wrap gap-2">
        {s.tags.map(t => (
          <span key={t} className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${tagColorMap[s.color]}`}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Products ────────────────────────────────────────────────── */
function Products() {
  const { ref, inView } = useInView();
  return (
    <section id="productos" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-50/40 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={ref} className={`mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700 mb-6">
            <Package size={11} /> Productos
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Software que construimos<br />
            <span className="gradient-text">para industrias específicas</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <ProductCard
            name="OdooMas"
            tagline="Implementaciones Odoo certificadas"
            desc="Llevamos Odoo a empresas de Uruguay y México con más de 80 módulos integrados. Partner Oficial certificado, soporte en español y resultados desde el día uno."
            tags={['Odoo Partner', 'Uruguay', 'México', '80+ módulos']}
            gradient="from-violet-600 to-blue-600"
            shadowColor="rgba(124,58,237,0.12)"
            logoSrc="/logos/odoomas.png"
            logoBg="white"
            features={[
              'Implementación guiada en 4-8 semanas',
              'Módulos de ventas, inventario, contabilidad',
              'Migración desde cualquier sistema',
              'Soporte post-implementación incluido',
            ]}
          />
          <ProductCard
            name="PreObra"
            tagline="ERP para la construcción"
            desc="Sistema completo de presupuestación, control de obra y certificación construido sobre Odoo. Diseñado para constructoras uruguayas que necesitan más que una planilla."
            tags={['Construcción', '6 módulos', '400+ funciones', 'Odoo 19']}
            gradient="from-orange-500 to-rose-600"
            shadowColor="rgba(249,115,22,0.12)"
            logoSrc="/logos/preobra.png"
            logoBg="#E5E7EB"
            features={[
              'Análisis de precios unitarios',
              'Control de avance y valor ganado (EVM)',
              'Certificación y subcontratos',
              'Exportación a MS Project / Primavera',
            ]}
          />
          <ProductCard
            name="Timekia"
            tagline="Control de asistencia inteligente"
            desc="Kiosco táctil de control de asistencia integrado nativamente con Odoo HR. Biometría, notificaciones y reportes automáticos para tu equipo."
            tags={['Asistencia', 'Kiosco', 'Odoo HR', 'Biometría']}
            gradient="from-blue-600 to-cyan-600"
            shadowColor="rgba(37,99,235,0.12)"
            logoSrc="/logos/timekia.jpg"
            logoBg="#1a1a2e"
            features={[
              'Registro biométrico y por código',
              'Integración nativa con Odoo HR',
              'Dashboard de asistencia en tiempo real',
              'Alertas automáticas de tardanzas',
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function ProductCard({ name, tagline, desc, tags, gradient, shadowColor, logoSrc, logoBg, features }: {
  name: string; tagline: string; desc: string; tags: string[];
  gradient: string; shadowColor: string; logoSrc: string; logoBg: string; features: string[];
}) {
  const { ref, inView } = useInView(0.1);

  return (
    <div
      ref={ref}
      style={{ boxShadow: `0 8px 40px ${shadowColor}`, transitionDelay: '0ms' }}
      className={`rounded-3xl overflow-hidden border border-gray-200 transition-all duration-700 hover:-translate-y-1 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className={`bg-gradient-to-br ${gradient} p-8`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-xs font-semibold text-white/75 uppercase tracking-widest mb-2">{tagline}</div>
            <h3 className="text-3xl font-black text-white">{name}</h3>
          </div>
          <div className="rounded-xl overflow-hidden flex-shrink-0 ml-4" style={{ background: logoBg, padding: '6px' }}>
            <img src={logoSrc} alt={name} className="w-14 h-14 object-contain rounded-lg" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map(t => (
            <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/20 text-white">{t}</span>
          ))}
        </div>
      </div>
      <div className="p-8 bg-white">
        <p className="text-gray-500 text-sm leading-relaxed mb-6">{desc}</p>
        <ul className="space-y-3">
          {features.map(f => (
            <li key={f} className="flex items-start gap-3 text-sm text-gray-700">
              <CheckCircle2 size={15} className="text-violet-500 flex-shrink-0 mt-0.5" />
              {f}
            </li>
          ))}
        </ul>
        <a href="#contacto" className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors group">
          Saber más <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}

/* ─── Why us ──────────────────────────────────────────────────── */
const reasons = [
  { icon: <Sparkles size={20} />, title: 'Partner Oficial Odoo', desc: 'Certificación directa de Odoo. Acceso a soporte de nivel 2, releases anticipadas y recursos exclusivos.' },
  { icon: <Globe2 size={20} />, title: 'Uruguay y México', desc: 'Equipos locales que conocen la regulación, los procesos y las particularidades de cada mercado.' },
  { icon: <Zap size={20} />, title: 'Implementaciones rápidas', desc: 'Metodología propia que lleva tu empresa de 0 a Odoo en producción en semanas, no en meses.' },
  { icon: <Code2 size={20} />, title: 'Desarrollo propio', desc: 'No somos solo revendedores. Construimos módulos custom, integraciones y productos sobre Odoo.' },
];

function WhyUs() {
  const { ref, inView } = useInView();
  return (
    <section id="nosotros" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-xs font-semibold text-cyan-700 mb-6">
              <Shield size={11} /> Por qué nosotros
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              No solo implementamos.<br />
              <span className="gradient-text">Nos quedamos.</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Entendemos que adoptar un ERP es una decisión crítica. Por eso no desaparecemos después del go-live — somos el equipo técnico externo de tu empresa.
            </p>
            <a href="#contacto" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-white border border-gray-200 hover:border-violet-300 text-sm font-semibold text-gray-800 hover:text-violet-700 transition-all shadow-sm">
              Hablar con un experto <ArrowRight size={14} />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <ReasonCard key={r.title} r={r} delay={i * 100} />
            ))}
          </div>
        </div>

        {/* Odoo partner banner */}
        <div className="mt-20 rounded-3xl bg-gradient-to-br from-violet-50 to-blue-50 border border-violet-200 p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <img src="/logos/odoo-partner.png" alt="Odoo Official Partner" className="h-14 object-contain flex-shrink-0" />
            <div>
              <div className="text-gray-900 font-black text-2xl mb-1">Partner Oficial de Odoo</div>
              <div className="text-gray-500">Certificación vigente para Uruguay y México. Acceso directo al ecosistema global Odoo.</div>
            </div>
          </div>
          <a
            href="https://www.odoo.com/es/partners/odoomas-24920157"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all hover:scale-105 shadow-md shadow-violet-200"
          >
            Ver perfil en Odoo.com <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}

function ReasonCard({ r, delay }: { r: typeof reasons[0]; delay: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`rounded-2xl p-6 bg-white border border-gray-200 hover:border-violet-200 hover:-translate-y-1 transition-all duration-700 shadow-sm ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 mb-4">
        {r.icon}
      </div>
      <h3 className="text-gray-900 font-bold text-sm mb-2">{r.title}</h3>
      <p className="text-gray-400 text-xs leading-relaxed">{r.desc}</p>
    </div>
  );
}

/* ─── Contact ─────────────────────────────────────────────────── */
type FormState = 'idle' | 'sending' | 'success' | 'error';

function Contact() {
  const { ref, inView } = useInView();
  const [state, setState] = useState<FormState>('idle');
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' });

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setState('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setState('success');
    } catch {
      setState('error');
    }
  }

  return (
    <section id="contacto" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-50/50 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-300/15 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100 text-xs font-semibold text-violet-700 mb-6">
              <Mail size={11} /> Contacto
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
              ¿Listo para dar el<br />
              <span className="gradient-text">siguiente paso?</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Contanos sobre tu empresa y te respondemos en menos de 24 horas.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Form */}
            <div className="lg:col-span-3 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              {state === 'success' ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} className="text-violet-600" />
                  </div>
                  <h3 className="text-gray-900 font-black text-2xl">¡Consulta enviada!</h3>
                  <p className="text-gray-500">Te enviamos una confirmación a <span className="text-violet-600 font-semibold">{form.email}</span>.<br />Nuestro equipo te contacta pronto.</p>
                  <button onClick={() => { setState('idle'); setForm({ name: '', company: '', email: '', phone: '', message: '' }); }} className="mt-4 px-6 py-2.5 rounded-xl bg-gray-100 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors">
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Nombre *</label>
                      <input
                        name="name" required value={form.name} onChange={onChange}
                        placeholder="Tu nombre"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Empresa *</label>
                      <input
                        name="company" required value={form.company} onChange={onChange}
                        placeholder="Tu empresa"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Email *</label>
                      <input
                        name="email" type="email" required value={form.email} onChange={onChange}
                        placeholder="tu@empresa.com"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Teléfono</label>
                      <input
                        name="phone" value={form.phone} onChange={onChange}
                        placeholder="+598 ..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">¿En qué podemos ayudarte?</label>
                    <textarea
                      name="message" value={form.message} onChange={onChange} rows={4}
                      placeholder="Contanos sobre tu empresa, qué procesos querés mejorar..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-colors resize-none"
                    />
                  </div>
                  {state === 'error' && (
                    <p className="text-red-500 text-sm">Error al enviar. Intentá de nuevo o escribinos directamente.</p>
                  )}
                  <button
                    type="submit"
                    disabled={state === 'sending'}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white font-semibold text-sm transition-all hover:scale-[1.02] glow-violet"
                  >
                    {state === 'sending' ? <><Loader2 size={16} className="animate-spin" /> Enviando...</> : <><Send size={16} /> Enviar consulta</>}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Respuesta garantizada</div>
                <div className="text-gray-900 font-bold text-lg">Menos de 24 horas</div>
                <div className="text-gray-400 text-sm mt-1">En días hábiles</div>
              </div>
              <a
                href="https://wa.me/59897574400?text=Hola%2C%20quiero%20solicitar%20un%20diagn%C3%B3stico%20gratuito"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-gray-200 hover:border-green-300 hover:-translate-y-0.5 transition-all shadow-sm group"
              >
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">WhatsApp</div>
                  <div className="text-gray-400 text-xs">+598 97 574 400</div>
                </div>
                <ArrowRight size={14} className="ml-auto text-gray-300 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
              </a>
              <a
                href="mailto:ventas@inflexiumlabs.com"
                className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-gray-200 hover:border-violet-300 hover:-translate-y-0.5 transition-all shadow-sm group"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">Email directo</div>
                  <div className="text-gray-400 text-xs">ventas@inflexiumlabs.com</div>
                </div>
                <ArrowRight size={14} className="ml-auto text-gray-300 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
              </a>
              <div className="grid grid-cols-2 gap-3">
                {['Diagnóstico gratis', 'Sin contratos largos', 'Soporte en español', 'UY & MX'].map(f => (
                  <div key={f} className="bg-white rounded-xl p-3 text-center border border-gray-200 shadow-sm">
                    <CheckCircle2 size={12} className="text-violet-500 mx-auto mb-1.5" />
                    <div className="text-gray-500 text-xs font-medium">{f}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-gray-200 py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <Logo size="sm" />
          <p className="text-gray-400 text-xs mt-2">Transformando empresas con tecnología que funciona.</p>
        </div>
        <div className="flex items-center gap-8 text-xs text-gray-400">
          <a href="#servicios" className="hover:text-gray-700 transition-colors">Servicios</a>
          <a href="#productos" className="hover:text-gray-700 transition-colors">Productos</a>
          <a href="#contacto" className="hover:text-gray-700 transition-colors">Contacto</a>
          <a href="mailto:ventas@inflexiumlabs.com" className="hover:text-gray-700 transition-colors">ventas@inflexiumlabs.com</a>
        </div>
      </div>
    </footer>
  );
}

/* ─── App ─────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="noise">
      <Nav />
      <Hero />
      <TrustStrip />
      <Services />
      <Products />
      <WhyUs />
      <Contact />
      <Footer />
      <Analytics />
    </div>
  );
}
