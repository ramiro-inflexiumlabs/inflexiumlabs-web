import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, Code2, Layers, Zap, Globe2, Shield, BarChart3,
  ChevronRight, Mail, MessageCircle, ExternalLink, Sparkles,
  Building2, Wrench, Package, CheckCircle2, Menu, X
} from 'lucide-react';

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
  const sizes = { sm: 'text-lg', md: 'text-xl', lg: 'text-3xl' };
  return (
    <span className={`font-black tracking-tight ${sizes[size]}`}>
      <span className="text-white">inflexium</span>
      <span className="gradient-text">labs</span>
    </span>
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
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-white/[0.06]' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-white/60 hover:text-white transition-colors">
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
        <button className="md:hidden text-white/70 hover:text-white" onClick={() => setMenuOpen(v => !v)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/[0.06] px-6 py-4 space-y-3">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-white/70 hover:text-white py-2 text-sm">
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
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-violet-700/20 blur-[120px] animate-glow-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-700/20 blur-[120px] animate-glow-pulse animate-delay-500 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-violet-900/10 blur-[160px] pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.04)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold text-violet-300 mb-10 animate-fade-up opacity-0-init" style={{ animationFillMode: 'forwards' }}>
          <Sparkles size={12} className="text-violet-400" />
          Partner Oficial de Odoo · Uruguay & México
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-8 animate-fade-up opacity-0-init animate-delay-100" style={{ animationFillMode: 'forwards' }}>
          <span className="text-white">Tecnología que</span>
          <br />
          <span className="gradient-text">transforma empresas</span>
        </h1>

        <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-12 animate-fade-up opacity-0-init animate-delay-200" style={{ animationFillMode: 'forwards' }}>
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
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl glass text-white/70 hover:text-white text-sm font-semibold transition-all hover:scale-105"
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
            <div key={s.label} className="glass rounded-2xl py-5 px-4">
              <div className="text-2xl font-black gradient-text">{s.value}</div>
              <div className="text-xs text-white/40 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float text-white/20">
        <div className="w-px h-10 bg-gradient-to-b from-white/0 to-white/20" />
        <span className="text-xs tracking-widest uppercase">scroll</span>
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
  violet: 'from-violet-500/20 to-violet-600/5 border-violet-500/20 hover:border-violet-500/40',
  blue:   'from-blue-500/20 to-blue-600/5 border-blue-500/20 hover:border-blue-500/40',
  cyan:   'from-cyan-500/20 to-cyan-600/5 border-cyan-500/20 hover:border-cyan-500/40',
};
const iconColorMap: Record<string, string> = {
  violet: 'text-violet-400 bg-violet-500/10',
  blue:   'text-blue-400 bg-blue-500/10',
  cyan:   'text-cyan-400 bg-cyan-500/10',
};
const tagColorMap: Record<string, string> = {
  violet: 'bg-violet-500/10 text-violet-300',
  blue:   'bg-blue-500/10 text-blue-300',
  cyan:   'bg-cyan-500/10 text-cyan-300',
};

function Services() {
  const { ref, inView } = useInView();
  return (
    <section id="servicios" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-semibold text-violet-300 mb-6">
            <Wrench size={11} /> Servicios
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Todo lo que tu empresa<br />
            <span className="gradient-text">necesita para crecer</span>
          </h2>
          <p className="text-white/50 max-w-xl text-lg">Desde la implementación hasta el soporte continuo, un solo equipo que conoce tu operación.</p>
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
      className={`rounded-2xl p-7 border bg-gradient-to-br ${colorMap[s.color]} glass-hover transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${iconColorMap[s.color]}`}>
        {s.icon}
      </div>
      <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
      <p className="text-white/50 text-sm leading-relaxed mb-5">{s.desc}</p>
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/20 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={ref} className={`mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-semibold text-blue-300 mb-6">
            <Package size={11} /> Productos
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Software que construimos<br />
            <span className="gradient-text">para industrias específicas</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <ProductCard
            name="OdooMas"
            tagline="Implementaciones Odoo certificadas"
            desc="Llevamos Odoo a empresas de Uruguay y México con más de 80 módulos integrados. Partner Oficial certificado, soporte en español y resultados desde el día uno."
            tags={['Odoo Partner', 'Uruguay', 'México', '80+ módulos']}
            gradient="from-violet-600 to-blue-600"
            glowColor="violet"
            features={[
              'Implementación guiada en 4-8 semanas',
              'Módulos de ventas, inventario, contabilidad',
              'Migración desde cualquier sistema',
              'Soporte post-implementación incluido',
            ]}
          />
          <ProductCard
            name="PreObra"
            tagline="ERP para la industria de la construcción"
            desc="Sistema completo de presupuestación, control de obra y certificación construido sobre Odoo. Diseñado para constructoras uruguayas que necesitan más que una planilla."
            tags={['Construcción', '6 módulos', '400+ funciones', 'Odoo 19']}
            gradient="from-orange-500 to-rose-600"
            glowColor="orange"
            features={[
              'Análisis de precios unitarios',
              'Control de avance y valor ganado (EVM)',
              'Certificación y subcontratos',
              'Exportación a MS Project / Primavera',
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function ProductCard({ name, tagline, desc, tags, gradient, glowColor, features }: {
  name: string; tagline: string; desc: string; tags: string[];
  gradient: string; glowColor: string; features: string[];
}) {
  const { ref, inView } = useInView(0.1);
  const glowStyle = glowColor === 'violet'
    ? 'shadow-[0_0_80px_rgba(124,58,237,0.2)]'
    : 'shadow-[0_0_80px_rgba(249,115,22,0.2)]';

  return (
    <div
      ref={ref}
      className={`rounded-3xl overflow-hidden border border-white/[0.08] glass-hover transition-all duration-700 ${glowStyle} ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className={`bg-gradient-to-br ${gradient} p-8`}>
        <div className="text-xs font-semibold text-white/70 uppercase tracking-widest mb-3">{tagline}</div>
        <h3 className="text-4xl font-black text-white mb-4">{name}</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(t => (
            <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/15 text-white">{t}</span>
          ))}
        </div>
      </div>
      <div className="p-8 bg-white/[0.02]">
        <p className="text-white/60 text-sm leading-relaxed mb-6">{desc}</p>
        <ul className="space-y-3">
          {features.map(f => (
            <li key={f} className="flex items-start gap-3 text-sm text-white/70">
              <CheckCircle2 size={15} className="text-violet-400 flex-shrink-0 mt-0.5" />
              {f}
            </li>
          ))}
        </ul>
        <a href="#contacto" className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-white/80 hover:text-white transition-colors group">
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-semibold text-cyan-300 mb-6">
              <Shield size={11} /> Por qué nosotros
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              No solo implementamos.<br />
              <span className="gradient-text">Nos quedamos.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Entendemos que adoptar un ERP es una decisión crítica. Por eso no desaparecemos después del go-live — somos el equipo técnico externo de tu empresa.
            </p>
            <a href="#contacto" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl glass glass-hover text-sm font-semibold text-white">
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
        <div className="mt-20 rounded-3xl glass border border-violet-500/20 p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="text-white font-black text-2xl mb-2">Partner Oficial de Odoo</div>
            <div className="text-white/50">Certificación vigente para Uruguay y México. Acceso directo al ecosistema global Odoo.</div>
          </div>
          <a
            href="https://www.odoo.com/es/partners/odoomas-24920157"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all hover:scale-105"
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
      className={`rounded-2xl p-6 glass border border-white/[0.06] glass-hover transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 mb-4">
        {r.icon}
      </div>
      <h3 className="text-white font-bold text-sm mb-2">{r.title}</h3>
      <p className="text-white/40 text-xs leading-relaxed">{r.desc}</p>
    </div>
  );
}

/* ─── Contact ─────────────────────────────────────────────────── */
function Contact() {
  const { ref, inView } = useInView();
  return (
    <section id="contacto" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/30 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-800/15 blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-semibold text-violet-300 mb-8">
            <Mail size={11} /> Contacto
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            ¿Listo para dar el<br />
            <span className="gradient-text">siguiente paso?</span>
          </h2>
          <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto">
            Agenda un diagnóstico gratuito. Analizamos tu operación y te mostramos exactamente cómo Odoo puede transformarla.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:ventas@inflexiumlabs.com"
              className="group flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all hover:scale-105 glow-violet"
            >
              <Mail size={16} />
              ventas@inflexiumlabs.com
            </a>
            <a
              href="https://wa.me/59897574400?text=Hola%2C%20quiero%20solicitar%20un%20diagn%C3%B3stico%20gratuito"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-7 py-4 rounded-xl glass text-white/70 hover:text-white font-semibold text-sm transition-all hover:scale-105"
            >
              <MessageCircle size={16} />
              +598 97 574 400
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              'Diagnóstico sin costo',
              'Respuesta en 24h',
              'Sin contratos largos',
              'Soporte en español',
            ].map(f => (
              <div key={f} className="glass rounded-xl py-3 px-4 text-xs text-white/50 font-medium">
                <CheckCircle2 size={12} className="text-violet-400 mx-auto mb-1" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <Logo />
          <p className="text-white/30 text-xs mt-2">Transformando empresas con tecnología que funciona.</p>
        </div>
        <div className="flex items-center gap-8 text-xs text-white/30">
          <a href="#servicios" className="hover:text-white/60 transition-colors">Servicios</a>
          <a href="#productos" className="hover:text-white/60 transition-colors">Productos</a>
          <a href="#contacto" className="hover:text-white/60 transition-colors">Contacto</a>
          <a href="mailto:ventas@inflexiumlabs.com" className="hover:text-white/60 transition-colors">ventas@inflexiumlabs.com</a>
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
      <Services />
      <Products />
      <WhyUs />
      <Contact />
      <Footer />
    </div>
  );
}
