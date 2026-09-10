import { Link } from 'react-router-dom';

const footerSections = [
  {
    title: 'Kundservice',
    links: ['Kontakt', 'Leverans', 'Retur & Byte', 'Storleksguide', 'FAQ'],
  },
  {
    title: 'Om SOLE',
    links: ['Om oss', 'Vårt hållbarhetsarbete', 'Karriär', 'Butiker', 'Press'],
  },
  {
    title: 'Juridik',
    links: ['Köpvillkor', 'Integritetspolicy', 'Cookies', 'Medlemsvillkor'],
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
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-sm font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      to="/"
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link}
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
