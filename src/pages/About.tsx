import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Coffee, Rocket, Users } from 'lucide-react';

const aboutHero = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600';

const team = [
  { name: 'Utvecklare 1', role: 'Frontend & Design' },
  { name: 'Utvecklare 2', role: 'Backend & Databas' },
  { name: 'Utvecklare 3', role: 'Produkt & UX' },
  { name: 'Utvecklare 4', role: 'Infrastruktur & Drift' },
];

const values = [
  {
    icon: Code2,
    title: 'Byggt av utvecklare',
    text: 'Varje detalj i butiken är kodad för hand av oss fyra. Vi älskar rena lösningar lika mycket som rena sneakers.',
  },
  {
    icon: Coffee,
    title: 'Sena nätter, mycket kaffe',
    text: 'Projektet föddes mellan föreläsningar och deadlines, drivet av nyfikenhet och alldeles för mycket koffein.',
  },
  {
    icon: Rocket,
    title: 'Alltid i beta',
    text: 'Vi lär oss medan vi bygger. Butiken blir bättre för varje commit, precis som vi gör som utvecklare.',
  },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <img src={aboutHero} alt="Vårt team" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl text-white">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-white/70 mb-4">Om oss</p>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4 text-balance">
              Fyra studenter, en oväntad idé
            </h1>
            <p className="text-lg text-white/90 max-w-xl text-pretty">
              Vi är en grupp på fyra studenter som lever våra programmeringsliv &mdash; och som en dag
              plötsligt bestämde oss för att starta en skobutik.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-6">Vår historia</h2>
        <div className="space-y-4 text-neutral-600 leading-relaxed">
          <p>
            SOLE började inte som en affärsplan. Vi är fyra vänner som pluggar programmering och spenderar
            våra dagar bland kodredigerare, buggar och kaffekoppar. Under en paus, mitt i ett projekt som
            egentligen handlade om något helt annat, kom vi på en galen idé: tänk om vi byggde en riktig
            skobutik?
          </p>
          <p>
            Ingen av oss hade sålt ett par skor tidigare. Men vi gillar att bygga saker, och vi gillar bra
            skor. Så vi öppnade våra terminaler och satte igång. Rad för rad, komponent för komponent,
            växte SOLE fram &mdash; en butik byggd med samma omsorg som vi lägger på vår kod.
          </p>
          <p>
            Idag är SOLE vårt sätt att kombinera det vi lär oss i skolan med något verkligt. Det är en plats
            där premium sneakers möter nyfikna studenter som vägrar sluta experimentera.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-neutral-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-10 text-center">Vad vi står för</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-8 border border-neutral-100">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-neutral-900 text-white mb-5">
                  <value.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-10">
          <Users className="h-6 w-6" aria-hidden="true" />
          <h2 className="text-2xl font-bold">Teamet bakom SOLE</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.role} className="text-center">
              <div className="aspect-square rounded-2xl bg-neutral-900 text-white flex items-center justify-center mb-4">
                <Code2 className="h-10 w-10" aria-hidden="true" />
              </div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-neutral-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-neutral-900 text-white rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Vill du se vad vi byggt?</h2>
            <p className="text-neutral-400">Kika in i butiken och hitta ditt nästa par.</p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-white text-neutral-900 px-6 py-3 rounded-full font-semibold hover:bg-neutral-100 transition-colors"
          >
            Till butiken
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
