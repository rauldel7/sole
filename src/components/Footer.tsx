import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

const footerSections = [
  {
    title: 'Kundservice',
    links: [
      { label: 'Kontakt', to: '/' },
      { label: 'Leverans', to: '/' },
      { label: 'Retur & Byte', to: '/' },
      { label: 'Storleksguide', to: '/' },
      { label: 'FAQ', to: '/' },
    ],
  },
  {
    title: 'Om SOLE',
    links: [
      { label: 'Om oss', to: '/about' },
      { label: 'Vårt hållbarhetsarbete', to: '/' },
      { label: 'Karriär', to: '/' },
      { label: 'Butiker', to: '/' },
      { label: 'Press', to: '/' },
    ],
  },
  {
    title: 'Juridik',
    links: [
      { label: 'Köpvillkor', to: '/' },
      { label: 'Integritetspolicy', to: '/' },
      { label: 'Cookies', to: '/' },
      { label: 'Medlemsvillkor', to: '/' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-white text-2xl font-bold tracking-[0.2em] mb-4">SOLE</h3>
            <p className="text-sm leading-relaxed">
              Premium sneakers och skor för alla tillfällen. Fri frakt över 1000 kr.
            </p>
            <div className="mt-6">
              <h4 className="text-white text-sm font-semibold mb-3">Kontakta oss</h4>
              <a
                href="tel:0731440653"
                className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                073-144 06 53
              </a>
            </div>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-sm font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs">© 2026 SOLE. Alla rättigheter förbehållna.</p>
          <div className="flex gap-4 text-xs">
            <span>VISA</span>
            <span>MASTERCARD</span>
            <span>KLARNA</span>
            <span>SWISH</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
