import { useState, useEffect, useRef, FormEvent } from 'react';

const facials = [
  { name: "Milk Facial", bn: "মিল্ক ফেসিয়াল", price: "৳ 1,200", icon: "🥛" },
  { name: "Lotus Gold Facial", bn: "লোটাস গোল্ড ফেসিয়াল", price: "৳ 3,000", icon: "✨" },
  { name: "Tazkira's Flower Facial", bn: "তাযকিরার ফ্লাওয়ার ফেসিয়াল", price: "৳ 1,200", icon: "🌸" },
  { name: "Lotus Diamond Facial", bn: "লোটাস ডায়মন্ড ফেসিয়াল", price: "৳ 2,000", icon: "💎" },
  { name: "Vegetable Peel", bn: "ভেজিটেবল পিল", price: "৳ 1,400", icon: "🥗" },
  { name: "Lotus Papaya Glow Facial", bn: "লোটাস পাপায়া গ্লো ফেসিয়াল", price: "৳ 2,500", icon: "🌟" },
  { name: "Galvanic Facial", bn: "গ্যালভানিক ফেসিয়াল", price: "৳ 1,500", icon: "⚡" },
  { name: "Lotus Jojoba Facial", bn: "লোটাস জোজোবা ফেসিয়াল", price: "৳ 2,500", icon: "🌿" },
  { name: "Gold Facial", bn: "গোল্ড ফেসিয়াল", price: "৳ 1,800", icon: "🥇" },
  { name: "Lotus Barberry Facial", bn: "লোটাস বারবেরি ফেসিয়াল", price: "৳ 3,500", icon: "🍇" },
  { name: "Aroma Facial", bn: "অ্যারোমা ফেসিয়াল", price: "৳ 1,500", icon: "🌺" },
  { name: "Platinum Facial", bn: "প্লাটিনাম ফেসিয়াল", price: "৳ 3,500", icon: "⚪" },
  { name: "Pearl Facial", bn: "পার্ল ফেসিয়াল", price: "৳ 2,200", icon: "🫧" },
  { name: "O3 Facial", bn: "O3 ফেসিয়াল", price: "৳ 3,500", icon: "🔬" },
  { name: "Whitening Facial", bn: "হোয়াইটেনিং ফেসিয়াল", price: "৳ 2,000", icon: "☀️" },
  { name: "O3+ Facial", bn: "O3+ ফেসিয়াল", price: "৳ 5,000", icon: "💫" },
  { name: "Diamond Facial", bn: "ডায়মন্ড ফেসিয়াল", price: "৳ 2,400", icon: "💠" },
  { name: "Orange Cool Facial", bn: "অরেঞ্জ কুল ফেসিয়াল", price: "৳ 3,500", icon: "🍊" },
  { name: "Fruit Facial", bn: "ফ্রুট ফেসিয়াল", price: "৳ 1,500", icon: "🍎" },
  { name: "Vitamin C Facial", bn: "ভিটামিন সি ফেসিয়াল", price: "৳ 3,500", icon: "🍋" },
  { name: "Party Glow Facial", bn: "পার্টি গ্লো ফেসিয়াল", price: "৳ 2,600", icon: "🎉" },
  { name: "Chocolate Facial", bn: "চকোলেট ফেসিয়াল", price: "৳ 3,500", icon: "🍫" },
  { name: "Lotus Pearl Facial", bn: "লোটাস পার্ল ফেসিয়াল", price: "৳ 2,500", icon: "🪷" },
  { name: "Pimple Treatment", bn: "পিম্পল ট্রিটমেন্ট", price: "৳ 1,000 / session", icon: "💆" },
  { name: "Lotus Whitening Facial", bn: "লোটাস হোয়াইটেনিং ফেসিয়াল", price: "৳ 2,200", icon: "🌼" },
  { name: "LED Mask", bn: "LED মাস্ক", price: "৳ 500", icon: "🔵" },
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('hair');
  const [isBn, setIsBn] = useState(false);
  const [bookingStatus, setBookingStatus] = useState('');
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeTab]);

  const toggleLang = () => setIsBn(!isBn);
  const openMenu = () => setIsMobileMenuOpen(true);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const submitBooking = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const service = formData.get('service') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const note = formData.get('note') as string;

    if (!name || !phone || !service || !date) {
      alert('Please fill in all required fields.');
      return;
    }

    const msg = encodeURIComponent(`Hello Habib Tazkiras! 👋\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\nDate: ${date}\nTime: ${time}\nNote: ${note}`);
    window.open(`https://wa.me/8801611070705?text=${msg}`, '_blank');
    setBookingStatus('✓ Redirecting to WhatsApp to confirm your appointment…');
  };

  const addToReveal = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const t = (en: string, bn: string) => isBn ? bn : en;

  return (
    <div className={isBn ? 'lang-bn' : 'lang-en'}>
      {/* ── NAV ── */}
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <a href="#" className="nav-logo">
          <div className="nav-logo-circle">HT</div>
          <div className="nav-logo-text">
            <span className="nav-logo-name">Habib Tazkiras</span>
            <span className="nav-logo-sub">Luxury Men's Salon</span>
          </div>
        </a>
        <ul className="nav-links">
          <li><a href="#about">{t('About', 'আমাদের সম্পর্কে')}</a></li>
          <li><a href="#services">{t('Services', 'সেবাসমূহ')}</a></li>
          <li><a href="#gallery">{t('Gallery', 'গ্যালারি')}</a></li>
          <li><a href="#reviews">{t('Reviews', 'রিভিউ')}</a></li>
          <li><a href="#contact">{t('Contact', 'যোগাযোগ')}</a></li>
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <button className="lang-toggle" onClick={toggleLang}>{isBn ? 'English' : 'বাংলা'}</button>
          <a href="#booking" className="nav-cta">{t('Book Now', 'বুক করুন')}</a>
          <div className="hamburger" onClick={openMenu} aria-label="Menu">
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} id="mobileMenu">
        <button className="mobile-close" onClick={closeMenu}>✕</button>
        <a href="#about" onClick={closeMenu}>{t('About', 'আমাদের সম্পর্কে')}</a>
        <a href="#services" onClick={closeMenu}>{t('Services', 'সেবাসমূহ')}</a>
        <a href="#gallery" onClick={closeMenu}>{t('Gallery', 'গ্যালারি')}</a>
        <a href="#reviews" onClick={closeMenu}>{t('Reviews', 'রিভিউ')}</a>
        <a href="#booking" onClick={closeMenu}>{t('Book Now', 'বুক করুন')}</a>
        <a href="#contact" onClick={closeMenu}>{t('Contact', 'যোগাযোগ')}</a>
      </div>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-lines"></div>
        <div className="hero-content" ref={addToReveal}>
          <div className="hero-badge">
            <span>{t("Premium Men's Grooming · Chattogram", "প্রিমিয়াম মেনস গ্রুমিং · চট্টগ্রাম")}</span>
          </div>
          <h1 className="hero-title">Habib<br /><span>Tazkiras</span></h1>
          {!isBn && <p className="hero-tagline">Where Grooming Meets Luxury</p>}
          {isBn && <p className="hero-tagline-bn">যেখানে সৌন্দর্য মেলে বিলাসিতার সাথে</p>}
          <div className="hero-btns">
            <a href="#booking" className="btn-gold">{t('Book Appointment', 'অ্যাপয়েন্টমেন্ট বুক করুন')}</a>
            <a href="#services" className="btn-outline">{t('View Services', 'সেবা দেখুন')}</a>
          </div>
        </div>
        <div className="hero-stats" ref={addToReveal}>
          <div className="hero-stat">
            <div className="hero-stat-num">10+</div>
            <div className="hero-stat-label">{t('Years Experience', 'বছরের অভিজ্ঞতা')}</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">5K+</div>
            <div className="hero-stat-label">{t('Happy Clients', 'সন্তুষ্ট গ্রাহক')}</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">30+</div>
            <div className="hero-stat-label">{t('Services Offered', 'সেবার ধরন')}</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">★ 5.0</div>
            <div className="hero-stat-label">{t('Rating', 'রেটিং')}</div>
          </div>
        </div>
        <div className="scroll-hint">
          <span>{t('Scroll', 'স্ক্রোল')}</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <div className="highlights">
        <div className="highlight-item">
          <div className="highlight-icon">✂️</div>
          <div className="highlight-text">
            <h4>{t('Expert Stylists', 'বিশেষজ্ঞ স্টাইলিস্ট')}</h4>
            <p>{t('Trained professionals', 'প্রশিক্ষিত পেশাদার')}</p>
          </div>
        </div>
        <div className="highlight-item">
          <div className="highlight-icon">💎</div>
          <div className="highlight-text">
            <h4>{t('Premium Products', 'প্রিমিয়াম পণ্য')}</h4>
            <p>{t('International brands', 'আন্তর্জাতিক ব্র্যান্ড')}</p>
          </div>
        </div>
        <div className="highlight-item">
          <div className="highlight-icon">🕐</div>
          <div className="highlight-text">
            <h4>{t('Easy Booking', 'সহজ বুকিং')}</h4>
            <p>{t('Online & WhatsApp', 'অনলাইন ও হোয়াটসঅ্যাপ')}</p>
          </div>
        </div>
        <div className="highlight-item">
          <div className="highlight-icon">🌟</div>
          <div className="highlight-text">
            <h4>{t('5-Star Experience', '৫ তারকা অভিজ্ঞতা')}</h4>
            <p>{t('Luxury atmosphere', 'বিলাসবহুল পরিবেশ')}</p>
          </div>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="about" id="about">
        <div className="about-inner">
          <div className="about-img-wrap reveal" ref={addToReveal}>
            <img className="about-img" src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=700&q=80" alt="Habib Tazkiras Salon Interior" referrerPolicy="no-referrer" />
            <div className="about-img-frame"></div>
            <div className="about-img-badge">
              <span>10+</span>
              <span>Years</span>
            </div>
          </div>
          <div className="about-body">
            <div className="section-eyebrow reveal" ref={addToReveal}>{t('Our Story', 'আমাদের গল্প')}</div>
            <h2 className="section-title reveal" ref={addToReveal}>
              {isBn ? 'আত্মবিশ্বাস গড়ে তোলার যাত্রা' : <>Crafting <span>Confidence</span><br />Since Day One</>}
            </h2>
            <div className="gold-divider reveal" ref={addToReveal}></div>
            <p className="reveal" ref={addToReveal}>
              {t(
                "Habib Tazkiras is Chattogram's premier destination for men's and children's grooming. Founded with a passion for precision and elegance, we bring together skilled artisans and luxury treatments to redefine the modern grooming experience.",
                "হাবিব তাযকিরাস চট্টগ্রামের সেরা পুরুষ ও শিশু সেলুন। আমরা দক্ষ শিল্পী ও বিলাসবহুল সেবার সমন্বয়ে আধুনিক গ্রুমিং অভিজ্ঞতা পুনর্সংজ্ঞায়িত করি।"
              )}
            </p>
            <p className="reveal" ref={addToReveal}>
              {t(
                "Every visit is a ritual — from the warm welcome at the door to the final styling touch. We use only premium products and stay ahead with the latest techniques in haircare and skincare.",
                "প্রতিটি ভিজিট একটি উৎসবের মতো — দরজা থেকে উষ্ণ অভ্যর্থনা থেকে শুরু করে শেষ স্টাইলিং টাচ পর্যন্ত। আমরা কেবল প্রিমিয়াম পণ্য ব্যবহার করি।"
              )}
            </p>
            <div className="about-features reveal" ref={addToReveal}>
              <div className="about-feat">{t('Certified Professionals', 'সার্টিফাইড পেশাদার')}</div>
              <div className="about-feat">{t('International Products', 'আন্তর্জাতিক পণ্য')}</div>
              <div className="about-feat">{t('Kids Friendly', 'শিশুবান্ধব')}</div>
              <div className="about-feat">{t('Hygienic Environment', 'স্বাস্থ্যকর পরিবেশ')}</div>
              <div className="about-feat">{t('Premium Facials', 'প্রিমিয়াম ফেসিয়াল')}</div>
              <div className="about-feat">{t('Custom Styling', 'কাস্টম স্টাইলিং')}</div>
            </div>
            <div className="reveal" style={{ marginTop: '2.5rem' }} ref={addToReveal}>
              <a href="#booking" className="btn-gold">{t('Book Your Visit', 'আজই বুক করুন')}</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="services" id="services">
        <div className="services-inner">
          <div className="services-header reveal" ref={addToReveal}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>{t('Our Services', 'আমাদের সেবাসমূহ')}</div>
            <h2 className="section-title">{t('Premium ', 'প্রিমিয়াম ')}<span>{t('Services', 'সেবাসমূহ')}</span></h2>
            <div className="gold-divider"></div>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto' }}>
              {t('Expertly crafted grooming experiences for men & children', 'পুরুষ ও শিশুদের জন্য বিশেষজ্ঞভাবে প্রস্তুত গ্রুমিং সেবা')}
            </p>
          </div>

          <div className="services-tabs reveal" ref={addToReveal}>
            <button className={`tab-btn ${activeTab === 'hair' ? 'active' : ''}`} onClick={() => setActiveTab('hair')}>{t('Hair & Cuts', 'চুল ও কাটা')}</button>
            <button className={`tab-btn ${activeTab === 'facial' ? 'active' : ''}`} onClick={() => setActiveTab('facial')}>{t('Facials', 'ফেসিয়াল')}</button>
            <button className={`tab-btn ${activeTab === 'polish' ? 'active' : ''}`} onClick={() => setActiveTab('polish')}>{t('Face Care & Polish', 'ফেস কেয়ার')}</button>
          </div>

          {/* HAIR PANEL */}
          {activeTab === 'hair' && (
            <div className="services-panel active" id="panel-hair">
              <p className="section-label">{t('— Hair Cuts —', '— চুল কাটা —')}</p>
              <div className="services-grid">
                <div className="service-card reveal" ref={addToReveal}>
                  <div className="service-icon">✂️</div>
                  <div className="service-name">{t('Adult Haircut (Formal)', 'প্রাপ্তবয়স্ক চুল কাটা (ফর্মাল)')}</div>
                  <div className="service-desc">{t('Clean, precise formal cut for the modern gentleman', 'আধুনিক ভদ্রলোকের জন্য পরিষ্কার, সুনির্দিষ্ট ফর্মাল কাট')}</div>
                  <div className="service-price">৳ 300</div>
                </div>
                <div className="service-card reveal" ref={addToReveal}>
                  <div className="service-icon">👦</div>
                  <div className="service-name">{t('Kids Haircut', 'শিশুদের চুল কাটা')}</div>
                  <div className="service-desc">{t('Gentle, fun cuts for your little ones in a welcoming space', 'একটি স্বাগত পরিবেশে আপনার ছোটদের জন্য মৃদু, মজার কাট')}</div>
                  <div className="service-price">৳ 500</div>
                </div>
                <div className="service-card reveal" ref={addToReveal}>
                  <div className="service-icon">💇</div>
                  <div className="service-name">{t('Stylist Haircut', 'স্টাইলিস্ট চুল কাটা')}</div>
                  <div className="service-desc">{t('Trendy, fashion-forward cuts by our expert stylists', 'আমাদের বিশেষজ্ঞ স্টাইলিস্টদের দ্বারা ট্রেন্ডি কাট')}</div>
                  <div className="service-price">৳ 500</div>
                </div>
                <div className="service-card reveal" ref={addToReveal}>
                  <div className="service-icon">🪒</div>
                  <div className="service-name">{t('Shave', 'শেভ')}</div>
                  <div className="service-desc">{t('Hot towel classic shave with premium blades', 'প্রিমিয়াম ব্লেড দিয়ে হট টাওয়েল ক্লাসিক শেভ')}</div>
                  <div className="service-price">৳ 200</div>
                </div>
                <div className="service-card reveal" ref={addToReveal}>
                  <div className="service-icon">🧔</div>
                  <div className="service-name">{t('Beard Trim (Normal)', 'দাড়ি ছাঁটা (সাধারণ)')}</div>
                  <div className="service-desc">{t('Clean shape and trim to keep your beard groomed', 'আপনার দাড়ি গ্রুমড রাখতে পরিষ্কার আকার এবং ছাঁটা')}</div>
                  <div className="service-price">৳ 200</div>
                </div>
                <div className="service-card reveal" ref={addToReveal}>
                  <div className="service-icon">🎨</div>
                  <div className="service-name">{t('Beard Trim (Stylist)', 'দাড়ি ছাঁটা (স্টাইলিস্ট)')}</div>
                  <div className="service-desc">{t('Designer shaping for bold, expressive beard styles', 'সাহসী, অভিব্যক্তিপূর্ণ দাড়ি শৈলীর জন্য ডিজাইনার শেপিং')}</div>
                  <div className="service-price">৳ 200 – 400</div>
                </div>
              </div>

              <p className="section-label" style={{ marginTop: '3rem' }}>{t('— Hair Setting —', '— চুল সেট করা —')}</p>
              <div className="services-grid">
                <div className="service-card reveal" ref={addToReveal}>
                  <div className="service-icon">💨</div>
                  <div className="service-name">{t('Hair Setting', 'চুল সেটিং')}</div>
                  <div className="service-desc">{t('Mousse / Cream / Gel / Spray — styled to perfection', 'মাউস / ক্রিম / জেল / স্প্রে — নিখুঁতভাবে স্টাইল করা')}</div>
                  <div className="service-price">৳ 150</div>
                </div>
                <div className="service-card reveal" ref={addToReveal}>
                  <div className="service-icon">🌊</div>
                  <div className="service-name">{t('Hair Rebounding / Straightening', 'হেয়ার রিবন্ডিং / স্ট্রেটেনিং')}</div>
                  <div className="service-desc">{t('Permanent smoothing treatment for silky, straight hair', 'সিল্কি, সোজা চুলের জন্য স্থায়ী স্মুথিং ট্রিটমেন্ট')}</div>
                  <div className="service-price">৳ 3,000 – 8,000</div>
                </div>
                <div className="service-card reveal" ref={addToReveal}>
                  <div className="service-icon">🔥</div>
                  <div className="service-name">{t('Hair Iron', 'হেয়ার আয়রন')}</div>
                  <div className="service-desc">{t('Temporary straightening with professional flat irons', 'পেশাদার ফ্ল্যাট আয়রন দিয়ে সাময়িক সোজা করা')}</div>
                  <div className="service-price">৳ 500 – 2,000</div>
                </div>
              </div>
            </div>
          )}

          {/* FACIAL PANEL */}
          {activeTab === 'facial' && (
            <div className="services-panel active" id="panel-facial">
              <p className="section-label">{t('— Premium Facials —', '— প্রিমিয়াম ফেসিয়াল —')}</p>
              <div className="services-grid">
                {facials.map((f, i) => (
                  <div key={i} className="service-card reveal" ref={addToReveal}>
                    <div className="service-icon">{f.icon}</div>
                    <div className="service-name">{t(f.name, f.bn)}</div>
                    <div className="service-price">{f.price}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* POLISH PANEL */}
          {activeTab === 'polish' && (
            <div className="services-panel active" id="panel-polish">
              <p className="section-label">{t('— Face Care —', '— ফেস কেয়ার —')}</p>
              <div className="services-grid">
                <div className="service-card reveal" ref={addToReveal}>
                  <div className="service-icon">🧼</div>
                  <div className="service-name">{t('Face Wash', 'ফেস ওয়াশ')}</div>
                  <div className="service-desc">{t('With Cleanser & Toner', 'ক্লিনজার এবং টোনার সহ')}</div>
                  <div className="service-price">৳ 300</div>
                </div>
                <div className="service-card reveal" ref={addToReveal}>
                  <div className="service-icon">✨</div>
                  <div className="service-name">{t("L'Oréal Face Wash & Massage", "লোরিয়াল ফেস ওয়াশ ও ম্যাসাজ")}</div>
                  <div className="service-desc">{t("Premium L'Oréal products with relaxing face massage", "আরামদায়ক ফেস ম্যাসাজ সহ প্রিমিয়াম লোরিয়াল পণ্য")}</div>
                  <div className="service-price">৳ 800</div>
                </div>
                <div className="service-card reveal" ref={addToReveal}>
                  <div className="service-icon">🔵</div>
                  <div className="service-name">{t('Face Scrub', 'ফেস স্ক্রাব')}</div>
                  <div className="service-desc">{t('Deep exfoliation for fresh, glowing skin', 'তাজা, উজ্জ্বল ত্বকের জন্য গভীর এক্সফোলিয়েশন')}</div>
                  <div className="service-price">৳ 400</div>
                </div>
                <div className="service-card reveal" ref={addToReveal}>
                  <div className="service-icon">⚫</div>
                  <div className="service-name">{t('Blackhead Removal', 'ব্ল্যাকহেড রিমুভাল')}</div>
                  <div className="service-desc">{t('Professional extraction for clear, clean pores', 'পরিষ্কার ছিদ্রের জন্য পেশাদার নিষ্কাশন')}</div>
                  <div className="service-price">৳ 600</div>
                </div>
              </div>

              <p className="section-label" style={{ marginTop: '3rem' }}>{t('— Face Polish —', '— ফেস পলিশ —')}</p>
              <div className="services-grid">
                <div className="service-card reveal" ref={addToReveal}><div className="service-icon">✦</div><div className="service-name">{t('Face Polish', 'ফেস পলিশ')}</div><div className="service-price">৳ 500</div></div>
                <div className="service-card reveal" ref={addToReveal}><div className="service-icon">✦</div><div className="service-name">{t('Neck Polish', 'ঘাড় পলিশ')}</div><div className="service-price">৳ 500</div></div>
                <div className="service-card reveal" ref={addToReveal}><div className="service-icon">✦</div><div className="service-name">{t('Hands Polish', 'হাত পলিশ')}</div><div className="service-price">৳ 600</div></div>
                <div className="service-card reveal" ref={addToReveal}><div className="service-icon">✦</div><div className="service-name">{t('Half Body (Front & Back)', 'অর্ধ শরীর পলিশ')}</div><div className="service-price">৳ 2,000</div></div>
                <div className="service-card reveal" ref={addToReveal}><div className="service-icon">✦</div><div className="service-name">{t('Face, Neck & Hands', 'মুখ, ঘাড় ও হাত পলিশ')}</div><div className="service-price">৳ 1,500</div></div>
                <div className="service-card reveal" ref={addToReveal}><div className="service-icon">✦</div><div className="service-name">{t('Full Body Polish', 'সম্পূর্ণ শরীর পলিশ')}</div><div className="service-price">৳ 3,000</div></div>
              </div>

              <p className="section-label" style={{ marginTop: '3rem' }}>{t('— Make-Up —', '— মেকআপ —')}</p>
              <div className="services-grid">
                <div className="service-card reveal" ref={addToReveal}><div className="service-icon">💄</div><div className="service-name">{t('Party Make-Up', 'পার্টি মেকআপ')}</div><div className="service-price">৳ 2,500</div></div>
                <div className="service-card reveal" ref={addToReveal}><div className="service-icon">💎</div><div className="service-name">{t('Exclusive Party Make-Up', 'এক্সক্লুসিভ পার্টি মেকআপ')}</div><div className="service-price">৳ 3,500</div></div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── BOOKING ── */}
      <section className="booking" id="booking">
        <div className="booking-inner">
          <div className="section-eyebrow reveal" style={{ justifyContent: 'center' }} ref={addToReveal}>{t('Appointment', 'অ্যাপয়েন্টমেন্ট')}</div>
          <h2 className="section-title reveal" ref={addToReveal}>{t('Book Your ', 'আপনার ')}<span>{t('Session', 'সেশন')}</span>{t('', ' বুক করুন')}</h2>
          <div className="gold-divider reveal" style={{ margin: '1.5rem auto' }} ref={addToReveal}></div>
          <p className="reveal" style={{ color: 'var(--text-muted)', fontSize: '1rem' }} ref={addToReveal}>
            {t("Reserve your spot and we'll confirm within 24 hours", "আপনার স্থান সংরক্ষণ করুন, আমরা ২৪ ঘণ্টার মধ্যে নিশ্চিত করব")}
          </p>
          <form className="booking-form reveal" onSubmit={submitBooking} ref={addToReveal}>
            <div className="form-group">
              <label>{t('Full Name', 'পূর্ণ নাম')}</label>
              <input type="text" name="name" placeholder={t("Your name", "আপনার নাম")} required />
            </div>
            <div className="form-group">
              <label>{t('Phone Number', 'ফোন নম্বর')}</label>
              <input type="tel" name="phone" placeholder="01XXXXXXXXX" required />
            </div>
            <div className="form-group">
              <label>{t('Select Service', 'সেবা বাছুন')}</label>
              <select name="service" required>
                <option value="">{t('— Choose a Service —', '— একটি সেবা চয়ন করুন —')}</option>
                <optgroup label={t("Hair Cuts", "চুল কাটা")}>
                  <option>Adult Haircut (Formal) – ৳300</option>
                  <option>Kids Haircut – ৳500</option>
                  <option>Stylist Haircut – ৳500</option>
                  <option>Shave – ৳200</option>
                  <option>Beard Trim Normal – ৳200</option>
                  <option>Beard Trim Stylist – ৳200-400</option>
                </optgroup>
                <optgroup label={t("Hair Setting", "চুল সেটিং")}>
                  <option>Hair Setting – ৳150</option>
                  <option>Hair Rebounding/Straightening – ৳3000-8000</option>
                  <option>Hair Iron – ৳500-2000</option>
                </optgroup>
                <optgroup label={t("Facials", "ফেসিয়াল")}>
                  <option>Milk Facial – ৳1200</option>
                  <option>Lotus Gold Facial – ৳3000</option>
                  <option>Gold Facial – ৳1800</option>
                  <option>Diamond Facial – ৳2400</option>
                  <option>Platinum Facial – ৳3500</option>
                  <option>Whitening Facial – ৳2000</option>
                  <option>Party Glow Facial – ৳2600</option>
                  <option>Pimple Treatment – ৳1000/session</option>
                  <option>LED Mask – ৳500</option>
                </optgroup>
                <optgroup label={t("Face Care & Polish", "ফেস কেয়ার ও পলিশ")}>
                  <option>Face Wash – ৳300</option>
                  <option>Face Scrub – ৳400</option>
                  <option>Blackhead Removal – ৳600</option>
                  <option>Face Polish – ৳500</option>
                  <option>Full Body Polish – ৳3000</option>
                  <option>Party Make-Up – ৳2500</option>
                  <option>Exclusive Party Make-Up – ৳3500</option>
                </optgroup>
              </select>
            </div>
            <div className="form-group">
              <label>{t('Preferred Date', 'পছন্দের তারিখ')}</label>
              <input type="date" name="date" min={new Date().toISOString().split('T')[0]} required />
            </div>
            <div className="form-group">
              <label>{t('Preferred Time', 'পছন্দের সময়')}</label>
              <select name="time">
                <option>10:00 AM</option><option>11:00 AM</option>
                <option>12:00 PM</option><option>1:00 PM</option>
                <option>2:00 PM</option><option>3:00 PM</option>
                <option>4:00 PM</option><option>5:00 PM</option>
                <option>6:00 PM</option><option>7:00 PM</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('Special Requests', 'বিশেষ অনুরোধ')}</label>
              <textarea name="note" placeholder={t("Any notes for us…", "আমাদের জন্য কোন নোট…")}></textarea>
            </div>
            <div className="form-submit">
              <button type="submit" className="btn-gold">{t('Confirm Appointment', 'অ্যাপয়েন্টমেন্ট নিশ্চিত করুন')}</button>
              {bookingStatus && <p style={{ marginTop: '1rem', color: 'var(--gold-light)', fontSize: '0.9rem' }}>{bookingStatus}</p>}
            </div>
          </form>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="gallery" id="gallery">
        <div className="gallery-inner">
          <div className="gallery-header reveal" ref={addToReveal}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>{t('Gallery', 'গ্যালারি')}</div>
            <h2 className="section-title">{t('Our ', 'আমাদের ')}<span>{t('Work', 'কাজ')}</span></h2>
            <div className="gold-divider"></div>
          </div>
          <div className="gallery-grid reveal" ref={addToReveal}>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1593702288056-f9454f730f42?w=800&q=80" alt="Salon haircut" referrerPolicy="no-referrer" />
              <div className="gallery-overlay"><span>{t('Precision Cut', 'সুনির্দিষ্ট কাট')}</span></div>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80" alt="Beard styling" referrerPolicy="no-referrer" />
              <div className="gallery-overlay"><span>{t('Beard Art', 'দাড়ি আর্ট')}</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials" id="reviews">
        <div className="testimonials-inner">
          <div className="testimonials-header reveal" ref={addToReveal}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>{t('Testimonials', 'টেস্টিমোনিয়াল')}</div>
            <h2 className="section-title">{t('What Clients ', 'গ্রাহকরা কী ')}<span>{t('Say', 'বলেন')}</span></h2>
            <div className="gold-divider"></div>
          </div>
          <div className="reviews-grid">
            <div className="review-card reveal" ref={addToReveal}>
              <div className="review-quote">"</div>
              <div className="review-stars">★★★★★</div>
              <p className="review-text">
                {t(
                  "Absolutely the best salon in Chattogram. The attention to detail and the quality of service is unmatched. I've been coming here for 3 years and have never been disappointed.",
                  "চট্টগ্রামের সেরা সেলুন। সেবার মান অতুলনীয়। আমি ৩ বছর ধরে এখানে আসছি।"
                )}
              </p>
              <div className="review-author">
                <div className="review-avatar">R</div>
                <div><div className="review-name">Rafiqul Islam</div><div className="review-role">Regular Client · 3 Years</div></div>
              </div>
            </div>
            <div className="review-card reveal" ref={addToReveal}>
              <div className="review-quote">"</div>
              <div className="review-stars">★★★★★</div>
              <p className="review-text">
                {t(
                  "My kids love coming here! The staff are so patient and welcoming with children. The environment is clean, premium and the haircuts are always perfect.",
                  "আমার বাচ্চারা এখানে আসতে ভালোবাসে! কর্মীরা শিশুদের প্রতি খুব ধৈর্যশীল।"
                )}
              </p>
              <div className="review-author">
                <div className="review-avatar">K</div>
                <div><div className="review-name">Kamal Hossain</div><div className="review-role">Parent · Chattogram</div></div>
              </div>
            </div>
            <div className="review-card reveal" ref={addToReveal}>
              <div className="review-quote">"</div>
              <div className="review-stars">★★★★★</div>
              <p className="review-text">
                {t(
                  "The Gold Facial completely transformed my skin. The product quality and the professional technique make this place truly luxury. Worth every taka!",
                  "গোল্ড ফেসিয়াল আমার ত্বক পুরোপুরি পরিবর্তন করেছে। এটি সত্যিই বিলাসবহুল।"
                )}
              </p>
              <div className="review-author">
                <div className="review-avatar">T</div>
                <div><div className="review-name">Tanvir Ahmed</div><div className="review-role">Verified Client</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="contact" id="contact">
        <div className="contact-inner">
          <div className="contact-info">
            <div className="section-eyebrow reveal" ref={addToReveal}>{t('Get In Touch', 'যোগাযোগ করুন')}</div>
            <h2 className="section-title reveal" ref={addToReveal}>{t('Find ', 'আমাদের ')}<span>{t('Us', 'খুঁজুন')}</span></h2>
            <div className="gold-divider reveal" ref={addToReveal}></div>
            <div className="contact-item reveal" ref={addToReveal}>
              <div className="contact-icon">📍</div>
              <div className="contact-item-body">
                <h4>{t('Location', 'ঠিকানা')}</h4>
                <p>9R5F+P7, Chattogram, Bangladesh</p>
              </div>
            </div>
            <div className="contact-item reveal" ref={addToReveal}>
              <div className="contact-icon">📞</div>
              <div className="contact-item-body">
                <h4>{t('Phone / WhatsApp', 'ফোন / হোয়াটসঅ্যাপ')}</h4>
                <a href="tel:+8801611070705">01611-070705</a>
              </div>
            </div>
            <div className="contact-item reveal" ref={addToReveal}>
              <div className="contact-icon">✉️</div>
              <div className="contact-item-body">
                <h4>{t('Email', 'ইমেইল')}</h4>
                <a href="mailto:HT@gmail.com">HT@gmail.com</a>
              </div>
            </div>
            <div className="contact-item reveal" ref={addToReveal}>
              <div className="contact-icon">🕐</div>
              <div className="contact-item-body">
                <h4>{t('Hours', 'সময়সূচি')}</h4>
                <p>{t('Sat – Thu: 10:00 AM – 9:00 PM', 'শনি – বৃহস্পতি: সকাল ১০টা – রাত ৯টা')}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('Friday: 2:00 PM – 9:00 PM', 'শুক্রবার: দুপুর ২টা – রাত ৯টা')}</p>
              </div>
            </div>
            <div className="reveal" style={{ marginTop: '2rem' }} ref={addToReveal}>
              <a href="https://wa.me/8801611070705" target="_blank" className="btn-gold">💬 WhatsApp Us</a>
            </div>
          </div>
          <div className="reveal" ref={addToReveal}>
            <div className="map-wrap">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.7!2d91.8333!3d22.3569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8a9e732b8c3%3A0x1!2sChattogram%2C+Bangladesh!5e0!3m2!1sen!2sbd!4v1"
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade">
              </iframe>
              <div className="map-label">Habib Tazkiras · Chattogram</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="nav-logo" style={{ marginBottom: '1rem' }}>
              <div className="nav-logo-circle" style={{ width: '52px', height: '52px', fontSize: '1.3rem' }}>HT</div>
              <div className="nav-logo-text">
                <span className="nav-logo-name" style={{ fontSize: '1.1rem' }}>Habib Tazkiras</span>
                <span className="nav-logo-sub">Luxury Men's Salon</span>
              </div>
            </div>
            <p>{t('Premium grooming destination for men and children in Chattogram. Where every cut tells a story.', 'চট্টগ্রামে পুরুষ ও শিশুদের জন্য প্রিমিয়াম গ্রুমিং গন্তব্য। প্রতিটি কাট একটি গল্প বলে।')}</p>
            <div className="footer-socials">
              <a href="https://wa.me/8801611070705" className="social-btn" target="_blank">💬</a>
              <a href="mailto:HT@gmail.com" className="social-btn">✉</a>
              <a href="tel:+8801611070705" class="social-btn">📞</a>
            </div>
          </div>
          <div className="footer-col">
            <h5>{t('Quick Links', 'দ্রুত লিঙ্ক')}</h5>
            <ul>
              <li><a href="#about">{t('About Us', 'আমাদের সম্পর্কে')}</a></li>
              <li><a href="#services">{t('Services', 'সেবাসমূহ')}</a></li>
              <li><a href="#gallery">{t('Gallery', 'গ্যালারি')}</a></li>
              <li><a href="#reviews">{t('Reviews', 'রিভিউ')}</a></li>
              <li><a href="#booking">{t('Book Now', 'বুক করুন')}</a></li>
              <li><a href="#contact">{t('Contact', 'যোগাযোগ')}</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>{t('Contact', 'যোগাযোগ')}</h5>
            <ul>
              <li><a href="tel:+8801611070705">01611-070705</a></li>
              <li><a href="mailto:HT@gmail.com">HT@gmail.com</a></li>
              <li><a href="#contact">9R5F+P7, Chattogram</a></li>
              <li><a href="https://wa.me/8801611070705" target="_blank">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 <span>Habib Tazkiras</span>. All rights reserved. Premium Men's Salon, Chattogram.</p>
          <p>Crafted with <span>♥</span> for excellence</p>
        </div>
      </footer>

      {/* ── WHATSAPP FLOAT ── */}
      <a href="https://wa.me/8801611070705" className="wa-float" target="_blank" title="Chat on WhatsApp" aria-label="WhatsApp">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  );
}
