import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  ChevronRight,
  Clock,
  Globe,
  Instagram,
  Mail,
  Mic2,
  Music,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type Lang = "pt" | "en";

const ACCENT = {
  from: "from-fuchsia-500",
  via: "via-violet-500",
  to: "to-sky-500",
};

const currencyBRL = (n: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(n);

const INSTAGRAM_URL = "https://instagram.com/cantesuavida";
const EMAIL = "autor@cantesuavida.com";
const EMAIL_MAILTO = `mailto:${EMAIL}`;

const CHECKOUT_URLS: Record<string, string> = {
  poema: "https://mpago.la/2X8tD5u",
  essencial: "https://mpago.la/1KLYWfp",
  premium: "https://mpago.la/2DaMBNL",
  jingle: "https://mpago.la/2caA6zw",
};

const copy = {
  pt: {
    nav: {
      how: "Como funciona",
      packs: "Pacotes",
      testimonials: "Depoimentos",
      rights: "Direitos autorais",
      faq: "Perguntas",
      contact: "Contato",
    },
    hero: {
      title: "Cante sua Vida",
      subtitle:
        "Celebre com versos. Você conta sua história — eu transformo em poesia e música autorais, sob encomenda, com emoção e intenção.",
      primary: "Escolher um pacote",
      secondary: "Ver como funciona",
      note:
        "Pagamento por PIX ou cartão • Entrega digital • Direitos autorais permanecem com o autor",
    },
    packsTitle: "Pacotes",
    packsSubtitle:
      "Você encomenda uma obra sob medida e recebe um resultado exclusivo — criado a partir da sua história.",
    buy: "COMPRAR",
    quote: "PEDIR PROPOSTA",
    contactLine:
      "Para mais informações, fale conosco pelo Instagram ou por e-mail.",
  },
  en: {
    nav: {
      how: "How it works",
      packs: "Packages",
      testimonials: "Testimonials",
      rights: "Copyright",
      faq: "FAQ",
      contact: "Contact",
    },
    hero: {
      title: "Sing Your Life",
      subtitle:
        "Celebrate with verses. You share your story — I turn it into original poetry and music, made-to-order, with emotion and intention.",
      primary: "Choose a package",
      secondary: "See how it works",
      note:
        "Pay by PIX or card • Digital delivery • Copyright remains with the author",
    },
    packsTitle: "Packages",
    packsSubtitle:
      "You commission a custom-made piece and receive an exclusive result — created from your story.",
    buy: "BUY",
    quote: "REQUEST A QUOTE",
    contactLine: "For more information, contact us via Instagram or email.",
  },
};

const packages = [
  {
    id: "poema",
    name: "Poema Autoral Personalizado",
    price: 660,
    lead: "Sua história se torna poesia com assinatura.",
    tag: "Mais vendido",
    delivery: "Prazo: 24–48h",
    includes: [
      "Poema exclusivo até 30 versos",
      "1 ajuste fino",
      "Entrega em PDF + texto",
      "Uso pessoal",
    ],
  },
  {
    id: "essencial",
    name: "Canção Autoral Essencial",
    price: 1320,
    lead: "Sua história pode ser lida e também ouvida.",
    tag: "Premium",
    delivery: "Prazo: 72h",
    includes: [
      "Letra autoral + música completa",
      "Estilo musical escolhido",
      "Voz + instrumental",
      "MP3",
      "1 ajuste",
      "Uso pessoal",
    ],
  },
  {
    id: "premium",
    name: "Jornada Poética Premium",
    price: 2490,
    lead: "Uma obra completa para momentos que não se repetem.",
    tag: "Experiência completa",
    delivery: "Prazo: 7 dias",
    includes: [
      "Poema + música completa",
      "2 ajustes",
      "Versão curta + versão completa",
      "Capa simples",
      "MP3 + WAV",
    ],
  },
  {
    id: "jingle",
    name: "Jingle Profissional / Campanha",
    priceText: "a partir de R$ 4.900",
    lead: "Identidade sonora com foco em impacto e lembrança.",
    tag: "Comercial",
    delivery: "Prazo: sob proposta",
    includes: [
      "Uso comercial liberado",
      "Variações 15s / 30s / 60s",
      "Letra + música",
      "Contrato de licença incluído",
    ],
  },
];

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-neutral-600 max-w-3xl">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow " +
        className
      }
    >
      {children}
    </div>
  );
}

function ButtonLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <a
      href={href}
      className={
        secondary
          ? "inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-sm font-medium hover:bg-neutral-50"
          : `inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${ACCENT.from} ${ACCENT.via} ${ACCENT.to} px-5 py-3 text-sm font-medium text-white hover:opacity-95`
      }
    >
      {children} <ChevronRight className="h-4 w-4" />
    </a>
  );
}

export default function WebsiteHistoriasParaMusica() {
  const [lang, setLang] = useState<Lang>("pt");
  const t = useMemo(() => copy[lang], [lang]);

  useEffect(() => {
    const existing = document.querySelector(
      'script[src*="app.trysoro.com/api/embed"]'
    );
    if (existing) return;

    const script = document.createElement("script");
    script.src =
      "https://app.trysoro.com/api/embed/a86f1ceb-1564-41b1-bd74-8993002d1e9c";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  const openCheckout = (id: string) => {
    const url = CHECKOUT_URLS[id];
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    alert(lang === "pt" ? "E-mail copiado!" : "Email copied!");
  };

  return (
    <div id="top" className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className={`absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-br ${ACCENT.from} ${ACCENT.to} opacity-15 blur-3xl`}
        />
        <div
          className={`absolute top-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br ${ACCENT.via} ${ACCENT.to} opacity-10 blur-3xl`}
        />
      </div>

      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3">
            <div
              className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${ACCENT.from} ${ACCENT.via} ${ACCENT.to} text-white flex items-center justify-center`}
            >
              <Music className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold">Cante sua Vida</div>
              <div className="text-xs text-neutral-500">Celebre com versos</div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-5 text-sm text-neutral-700">
            <a href="#how">{t.nav.how}</a>
            <a href="#packs">{t.nav.packs}</a>
            <a href="#testimonials">{t.nav.testimonials}</a>
            <a href="#rights">{t.nav.rights}</a>
            <a href="#faq">{t.nav.faq}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>

          <button
            onClick={() => setLang((p) => (p === "pt" ? "en" : "pt"))}
            className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-3 py-2 text-xs"
          >
            <Globe className="h-4 w-4" />
            {lang === "pt" ? "PT-BR → EN" : "EN → PT-BR"}
          </button>
        </div>
      </header>

      <main>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-2 mb-5"
              >
                <span className="rounded-full border bg-white px-3 py-1 text-xs">
                  <Sparkles className="inline h-3.5 w-3.5 mr-1" />
                  Cante sua Vida
                </span>
                <span className="rounded-full border bg-white px-3 py-1 text-xs">
                  <ShieldCheck className="inline h-3.5 w-3.5 mr-1" />
                  Direitos protegidos
                </span>
                <span className="rounded-full border bg-white px-3 py-1 text-xs">
                  <Clock className="inline h-3.5 w-3.5 mr-1" />
                  Entrega digital
                </span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
                {t.hero.title}
              </h1>
              <p className="mt-4 text-lg text-neutral-600 max-w-xl">
                {t.hero.subtitle}
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <ButtonLink href="#packs">{t.hero.primary}</ButtonLink>
                <ButtonLink href="#how" secondary>
                  {t.hero.secondary}
                </ButtonLink>
              </div>

              <p className="mt-5 text-xs text-neutral-500">{t.hero.note}</p>
            </div>

            <Card className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">O que você recebe</div>
                  <p className="mt-1 text-sm text-neutral-600">
                    Arquivos organizados e prontos para usar.
                  </p>
                </div>
                <div
                  className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${ACCENT.from} ${ACCENT.via} ${ACCENT.to} text-white flex items-center justify-center`}
                >
                  <BadgeCheck className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-5 grid sm:grid-cols-2 gap-3 text-sm">
                {["PDF: Poema/Letra", "MP3/WAV: Música", "Cover: Capa simples", "Link privado"].map(
                  (x) => (
                    <div key={x} className="rounded-xl border p-3">
                      {x}
                    </div>
                  )
                )}
              </div>
            </Card>
          </div>
        </section>

        <Section id="how" title={t.nav.how}>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              ["1) Você conta a história", "Preenche um formulário rápido ou envia áudio/texto.", Mic2],
              ["2) Eu crio a obra", "Transformo o enredo em poema e/ou canção.", Music],
              ["3) Você recebe", "Entrega por link privado com arquivos organizados.", BadgeCheck],
            ].map(([title, desc, Icon]: any) => (
              <Card key={title} className="p-6">
                <div className="h-11 w-11 rounded-2xl bg-neutral-100 flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 text-sm font-semibold">{title}</div>
                <div className="mt-1 text-sm text-neutral-600">{desc}</div>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="packs" title={t.packsTitle} subtitle={t.packsSubtitle}>
          <div className="grid lg:grid-cols-4 gap-4">
            {packages.map((p) => (
              <Card key={p.id} className="p-6 flex flex-col">
                <div>
                  <div className="text-sm font-semibold">{p.name}</div>
                  <div className="mt-2 text-2xl font-semibold">
                    {p.priceText || currencyBRL(p.price || 0)}
                  </div>
                  <div className="mt-2 text-sm text-neutral-600">{p.lead}</div>
                  <span
                    className={`mt-3 inline-flex rounded-full bg-gradient-to-r ${ACCENT.from} ${ACCENT.via} ${ACCENT.to} text-white text-xs px-3 py-1`}
                  >
                    {p.tag}
                  </span>
                  <div className="mt-4 text-xs text-neutral-500">
                    {p.delivery}
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                  {p.includes.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-neutral-900" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openCheckout(p.id)}
                  className={`mt-auto pt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${ACCENT.from} ${ACCENT.via} ${ACCENT.to} text-white px-5 py-3 text-sm font-medium hover:opacity-95`}
                >
                  {p.id === "jingle" ? t.quote : t.buy}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </Card>
            ))}
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-4">
            {[
              ["Publicação no streaming", "R$ 660", "Spotify, Apple Music, Deezer e mais."],
              ["Urgência 48h", "+ R$ 490", "Prioridade na produção."],
              ["Urgência 24h", "+ R$ 990", "Entrega em 24h quando disponível."],
            ].map(([name, price, desc]) => (
              <Card key={name} className="p-5">
                <div className="text-sm font-semibold">{name}</div>
                <div className="mt-1 text-lg font-semibold">{price}</div>
                <p className="mt-2 text-sm text-neutral-600">{desc}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          id="testimonials"
          title={t.nav.testimonials}
          subtitle="Histórias reais de quem transformou sentimentos em poesia e música."
        >
          <div className="grid md:grid-cols-3 gap-4">
            {[
              ["Ana Paula M.", "Presente de casamento", "A música captou exatamente a nossa história."],
              ["Carlos R.", "Empresário", "A essência da empresa virou música de forma sofisticada."],
              ["Juliana S.", "Homenagem familiar", "Não é apenas um poema. É memória viva."],
            ].map(([name, role, text]) => (
              <Card key={name} className="p-6">
                <div className="text-sm font-semibold">{name}</div>
                <div className="text-xs text-neutral-500">{role}</div>
                <p className="mt-3 text-sm text-neutral-700">“{text}”</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="rights" title={t.nav.rights}>
          <Card className="p-6">
            <ul className="space-y-2 text-sm text-neutral-700">
              <li>• Os direitos autorais das obras permanecem com o autor.</li>
              <li>• A contratação concede licença de uso pessoal.</li>
              <li>
                • Uso comercial, publicitário, político ou cessão de direitos
                deve ser negociado separadamente.
              </li>
            </ul>
          </Card>
        </Section>

        <Section id="faq" title={t.nav.faq}>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              ["Eu vou ser dono da música?", "Você recebe uma licença de uso pessoal. Os direitos autorais permanecem com o autor."],
              ["O que preciso enviar?", "Um resumo da história, nomes importantes, emoção desejada e referências se quiser."],
              ["Você publica no Spotify?", "Sim, como add-on. A publicação não muda a titularidade autoral."],
              ["Tem reembolso?", "Como é obra personalizada, após o início da criação não há reembolso."],
            ].map(([q, a]) => (
              <Card key={q} className="p-6">
                <div className="text-sm font-semibold">{q}</div>
                <p className="mt-2 text-sm text-neutral-600">{a}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          id="blog"
          title="Blog & Inspirações"
          subtitle="Histórias, versos e bastidores criativos."
        >
          <Card className="p-4">
            <div id="soro-blog" />
          </Card>
        </Section>

        <Section id="contact" title={t.nav.contact}>
          <Card className="p-6">
            <p className="text-sm text-neutral-700">
              {t.contactLine}
            </p>

            <div className="mt-5 grid md:grid-cols-2 gap-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-neutral-200 p-5 hover:bg-neutral-50"
              >
                <Instagram className="h-5 w-5" />
                <div className="mt-2 text-sm font-semibold">Instagram</div>
                <div className="text-sm text-neutral-600">@cantesuavida</div>
              </a>

              <div className="rounded-2xl border border-neutral-200 p-5">
                <Mail className="h-5 w-5" />
                <div className="mt-2 text-sm font-semibold">E-mail</div>
                <a href={EMAIL_MAILTO} className="text-sm text-neutral-600 underline">
                  {EMAIL}
                </a>
                <button
                  onClick={copyEmail}
                  className="mt-3 block rounded-xl border px-3 py-2 text-sm hover:bg-neutral-50"
                >
                  Copiar e-mail
                </button>
              </div>
            </div>
          </Card>
        </Section>
      </main>

      <footer className="border-t border-neutral-200 bg-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-sm text-neutral-500">
          © 2026 Cante sua Vida — Celebre com versos. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
