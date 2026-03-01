/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Lightbulb, 
  Sparkles, 
  Zap, 
  Layers, 
  ArrowRight, 
  Menu, 
  X, 
  Instagram, 
  Twitter, 
  Linkedin,
  ChevronDown,
  Sun,
  Moon,
  Globe,
  User,
  Lock,
  Mail,
  Loader2
} from 'lucide-react';

const AuthModal = ({ isOpen, onClose, onAuthSuccess }: { isOpen: boolean, onClose: () => void, onAuthSuccess: (user: any) => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const body = isLogin ? { email, password } : { email, password, name };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.success) {
        onAuthSuccess(data.user);
        onClose();
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md glass p-8 rounded-3xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
            
            <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <Sun className="w-10 h-10 text-brand-gold mx-auto mb-4" />
              <h2 className="text-3xl font-serif">{isLogin ? 'Welcome Back' : 'Join Light Group'}</h2>
              <p className="text-white/50 text-sm mt-2">
                {isLogin ? 'Enter your credentials to access your account' : 'Create an account to start your journey with us'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-brand-gold outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-brand-gold outline-none transition-colors"
                    placeholder="hello@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-brand-gold outline-none transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs text-center"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black py-3 rounded-xl font-medium text-sm uppercase tracking-widest hover:bg-brand-gold hover:text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs text-white/40 hover:text-brand-gold transition-colors"
              >
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar = ({ onAuthOpen, user, onLogout }: { onAuthOpen: () => void, user: any, onLogout: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
      isScrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
            <Sun className="w-6 h-6 text-brand-gold group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <span className="text-xl font-serif tracking-widest uppercase">Light Group</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {['Vision', 'Work', 'Process', 'Contact'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm uppercase tracking-widest text-white/60 hover:text-white transition-colors"
            >
              {item}
            </motion.a>
          ))}
          
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-widest text-brand-gold">Hi, {user.name.split(' ')[0]}</span>
              <button
                onClick={onLogout}
                className="px-6 py-2 rounded-full border border-white/20 hover:border-red-500/50 hover:text-red-400 transition-all duration-300 text-xs uppercase tracking-widest"
              >
                Logout
              </button>
            </div>
          ) : (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={onAuthOpen}
              className="px-6 py-2 rounded-full border border-white/20 hover:border-brand-gold hover:text-brand-gold transition-all duration-300 text-xs uppercase tracking-widest"
            >
              Sign In
            </motion.button>
          )}
        </div>

        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {['Vision', 'Work', 'Process', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="text-lg uppercase tracking-widest"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              {user ? (
                <button onClick={onLogout} className="text-left text-red-400 uppercase tracking-widest">Logout</button>
              ) : (
                <button onClick={() => { onAuthOpen(); setIsMobileMenuOpen(false); }} className="text-left uppercase tracking-widest">Sign In</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 atmosphere opacity-60" />
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[120px]" />
        </motion.div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-brand-gold mb-8">
            Illuminating the Future
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-light leading-none mb-8 tracking-tighter">
            We bring <br />
            <span className="italic text-brand-gold">clarity</span> to light.
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed mb-12">
            Light Group is a boutique creative studio dedicated to crafting 
            luminous digital experiences that resonate, inspire, and endure.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-full bg-white text-black font-medium text-sm uppercase tracking-widest hover:bg-brand-gold hover:text-white transition-colors duration-500"
            >
              Explore Work
            </motion.button>
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-sm uppercase tracking-widest text-white/80 hover:text-white transition-colors"
            >
              Our Philosophy <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-brand-gold to-transparent" />
      </motion.div>
    </section>
  );
};

interface FeatureCardProps {
  icon: any;
  title: string;
  description: string;
  index: number;
  key?: React.Key;
}

const FeatureCard = ({ icon: Icon, title, description, index }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group p-8 rounded-3xl glass hover:bg-white/10 transition-all duration-500"
  >
    <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-6 group-hover:bg-brand-gold/20 transition-colors">
      <Icon className="w-7 h-7 text-brand-gold" />
    </div>
    <h3 className="text-2xl font-serif mb-4 group-hover:text-brand-gold transition-colors">{title}</h3>
    <p className="text-white/50 leading-relaxed font-light">{description}</p>
  </motion.div>
);

const Vision = () => {
  const features = [
    {
      icon: Lightbulb,
      title: "Strategic Brilliance",
      description: "We don't just design; we illuminate the core essence of your brand through rigorous research and creative intuition."
    },
    {
      icon: Sparkles,
      title: "Aesthetic Precision",
      description: "Every pixel is placed with intention. Our designs are balanced, refined, and crafted to stand the test of time."
    },
    {
      icon: Zap,
      title: "Dynamic Motion",
      description: "We bring static ideas to life through fluid animations and interactive storytelling that captivates your audience."
    }
  ];

  return (
    <section id="vision" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-gold text-[10px] uppercase tracking-[0.3em] mb-4 block">Our Vision</span>
            <h2 className="text-5xl md:text-7xl font-serif font-light leading-tight">
              Crafting clarity in a <br />
              <span className="italic">noisy world.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-lg text-white/60 font-light leading-relaxed"
          >
            At Light Group, we believe that great design is like light—it reveals what was hidden, 
            guides the way, and creates an atmosphere where ideas can flourish. We partner with 
            visionaries to build brands that shine.
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <FeatureCard 
              key={i} 
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={i} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  index: number;
  key?: React.Key;
}

const ProjectCard = ({ title, category, image, index }: ProjectCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group relative aspect-[4/5] overflow-hidden rounded-3xl cursor-pointer"
  >
    <img 
      src={image} 
      alt={title} 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      referrerPolicy="no-referrer"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
    <div className="absolute bottom-0 left-0 p-8 w-full">
      <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold mb-2 block">{category}</span>
      <h3 className="text-3xl font-serif">{title}</h3>
      <motion.div 
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        className="h-px bg-brand-gold mt-4"
      />
    </div>
  </motion.div>
);

const Work = () => {
  const projects = [
    {
      title: "Lumina Residences",
      category: "Architecture & Branding",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Aether Skincare",
      category: "Product Design",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Solaris Tech",
      category: "Digital Experience",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="work" className="py-32 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-brand-gold text-[10px] uppercase tracking-[0.3em] mb-4 block">Selected Work</span>
            <h2 className="text-5xl md:text-7xl font-serif font-light">Recent <span className="italic">Illuminations</span></h2>
          </div>
          <button className="px-8 py-3 rounded-full border border-white/10 hover:border-brand-gold transition-colors text-xs uppercase tracking-widest">
            View Archive
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard 
              key={i} 
              title={project.title}
              category={project.category}
              image={project.image}
              index={i} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-gold/5 blur-[150px] rounded-full -z-10" />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-8xl font-serif font-light mb-8">
              Let's build something <br />
              <span className="italic text-brand-gold">radiant</span> together.
            </h2>
            <p className="text-xl text-white/50 font-light max-w-2xl mx-auto">
              Whether you have a fully formed vision or just a spark of an idea, 
              we're here to help you bring it to light.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass p-8 md:p-12 rounded-3xl max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:border-brand-gold outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:border-brand-gold outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Message</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:border-brand-gold outline-none transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-white text-black py-4 rounded-xl font-medium text-sm uppercase tracking-widest hover:bg-brand-gold hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : 
               status === 'success' ? 'Message Sent!' : 'Send Message'}
            </button>
            {status === 'error' && (
              <p className="text-red-400 text-xs text-center">Failed to send message. Please try again.</p>
            )}
          </form>
        </motion.div>

        <div className="flex flex-col items-center gap-8 mt-20">
          <a 
            href="mailto:hello@lightgroup.com" 
            className="text-2xl md:text-4xl font-serif hover:text-brand-gold transition-colors underline underline-offset-8 decoration-white/10 hover:decoration-brand-gold"
          >
            hello@lightgroup.com
          </a>
          
          <div className="flex gap-8">
            {[Instagram, Twitter, Linkedin].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -5, color: '#D4AF37' }}
                className="text-white/40 transition-colors"
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex items-center gap-2">
        <Sun className="w-5 h-5 text-brand-gold" />
        <span className="text-sm font-serif tracking-widest uppercase">Light Group</span>
      </div>
      
      <div className="flex gap-12 text-[10px] uppercase tracking-[0.2em] text-white/40">
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        <span>© 2026 Light Group Studio</span>
      </div>

      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
        <Globe className="w-3 h-3" />
        <span>Global / English</span>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('light_group_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    localStorage.setItem('light_group_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('light_group_user');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] selection:bg-brand-gold/30">
      <Navbar onAuthOpen={() => setIsAuthOpen(true)} user={user} onLogout={handleLogout} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onAuthSuccess={handleAuthSuccess} />
      <main>
        <Hero />
        <Vision />
        <Work />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
