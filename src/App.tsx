import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Music,
  Sparkles,
  ShieldCheck,
  Clock,
  Mic2,
  BadgeCheck,
  Mail,
  Instagram,
  ChevronRight,
  Globe,
  Play,
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

type PackageItem = {
  id: string;
  name: string;
  lead: string;
  includes: string[];
  delivery: string;
  cta: string;
  tag: string;
  price?: number;
  priceText?: string;
};

type Copy = {
  nav: {
    how: string;
    packs: string;
    samples: string;
    testimonials: string;
    rights: string;
    faq: string;
    contact: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    note: string;
  };
  badges: { icon: any; title: string; desc: string }[];
  how: {
    title: string;
    steps: { icon: any; title: string; desc: string }[];
    cta: string;
  };
  packs: {
    title: string;
    subtitle: string;
    items: PackageItem[];
    addOnsTitle: string;
    addOns: { name: string; price?: number; priceText?: string; desc: string }[];
    disclaimer: string;
  };
  samples: {
    title: string;
    subtitle: string;
    placeholder: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
    cta: string;
    items: { name: string; role: string; text: string; videoUrl?: string }[];
  };
  rights: {
    title: string;
    bullets: string[];
    checkoutText: string;
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
  contact: {
    title: string;
    subtitle: string;
    fieldsNote: string;
    instagram: string;
    email: string;
    instaHint: string;
    emailHint: string;
  };
  footer: string;
  lang: string;
  switch: string;
  ctaSticky: string;
};

const copy: Record<Lang, Copy> = {
  pt: {
    nav: {
      how: "Como funciona",
      packs: "Pacotes",
      samples: "Exemplos",
      testimonials: "Depoimentos",
      rights: "Direitos autorais",
      faq: "Perguntas",
      contact: "Contato",
    },
    hero: {
      kicker: "Cante sua Vida",
      title: "Cante sua Vida",
      subtitle:
        "Celebre com versos. Você conta sua história — eu transformo em poesia e música autorais, sob encomenda, com emoção e intenção.",
      ctaPrimary: "Escolher um pacote",
      ctaSecondary: "Ver como funciona",
      note:
        "Pagamento por PIX ou cartão • Entrega digital • Direitos autorais permanecem com o autor",
    },
    badges: [
      { icon: Sparkles, title: "Autoral", desc: "Criado do zero, sob medida" },
      { icon: Clock, title: "Prazos claros", desc: "Você sabe quando recebe" },
      { icon: ShieldCheck, title: "Proteção", desc: "Termos simples e objetivos" },
    ],
    how: {
      title: "Como funciona",
      steps: [
        {
          icon: Mic2,
          title: "1) Você conta a história",
          desc: "Preenche um formulário rápido (ou envia áudio/texto).",
        },
        {
          icon: Music,
          title: "2) Eu crio a obra",
          desc: "Transformo o enredo em poema e/ou canção no estilo escolhido.",
        },
        {
          icon: BadgeCheck,
          title: "3) Você recebe",
          desc: "Entrega por link privado com arquivos organizados (PDF/MP3/WAV).",
        },
      ],
      cta: "Quero começar agora",
    },
    packs: {
      title: "Pacotes",
      subtitle:
        "Escada premium (Brasil). Você compra uma obra sob encomenda — não um produto genérico.",
      items: [
        {
          id: "poema",
          name: "Poema Autoral Personalizado",
          price: 660,
          lead: "O mínimo base. A sua história vira poesia com assinatura.",
          includes: [
            "Poema exclusivo (até 30 versos)",
            "1 ajuste fino",
            "Entrega: PDF + texto",
            "Uso pessoal",
          ],
          delivery: "Prazo: 24–48h (padrão)",
          cta: "Comprar Poema",
          tag: "Mais vendido",
        },
        {
          id: "essencial",
          name: "Canção Autoral Essencial",
          price: 1320,
          lead: "Sua história deixa de ser lida — passa a ser ouvida.",
          includes: [
            "Letra autoral + música completa",
            "Estilo musical escolhido",
            "Voz + instrumental",
            "MP3",
            "1 ajuste",
            "Uso pessoal",
          ],
          delivery: "Prazo: 72h (padrão)",
          cta: "Comprar Canção",
          tag: "Premium",
        },
        {
          id: "premium",
          name: "Jornada Poética Premium",
          price: 2490,
          lead: "Uma obra completa para momentos que não se repetem.",
          includes: [
            "Poema + música completa",
            "2 ajustes",
            "Versão curta (30–45s) + completa (2–3 min)",
            "Capa simples",
            "MP3 + WAV",
          ],
          delivery: "Prazo: 7 dias (padrão)",
          cta: "Comprar Premium",
          tag: "Experiência completa",
        },
        {
          id: "jingle",
          name: "Jingle Profissional / Campanha",
          priceText: "a partir de R$ 4.900",
          lead: "Identidade sonora com foco em impacto e lembrança.",
          includes: [
            "Uso comercial liberado (licença)",
            "Variações 15s / 30s / 60s",
            "Letra + música",
            "Contrato de licença incluído",
          ],
          delivery: "Prazo: sob proposta",
          cta: "Pedir proposta",
          tag: "Comercial",
        },
      ],
      addOnsTitle: "Add-ons",
      addOns: [
        {
          name: "Publicação no streaming (Spotify e +)",
          price: 660,
          desc: "Distribuição + ISRC + créditos + capa final. Não altera a titularidade autoral.",
        },
        {
          name: "Urgência 48h",
          priceText: "+ R$ 490",
          desc: "Prioridade na fila de produção.",
        },
        {
          name: "Urgência 24h",
          priceText: "+ R$ 990",
          desc: "Entrega em 24h (quando disponível).",
        },
      ],
      disclaimer:
        "Uso comercial não está incluído nos pacotes pessoais. Se você precisa para empresa/campanha/anúncios, solicite proposta.",
    },
    samples: {
      title: "Exemplos",
      subtitle:
        "Coloque aqui 6–10 demos (áudio) e trechos de letras. Se quiser, eu organizo o portfólio por categorias.",
      placeholder:
        "(Placeholder) • Exemplo 1 — Casamento • Exemplo 2 — Empresa • Exemplo 3 — Homenagem • Exemplo 4 — Jingle",
    },
    testimonials: {
      title: "O que dizem os clientes",
      subtitle: "Histórias reais de quem transformou sentimentos em poesia e música.",
      cta: "Ver vídeo",
      items: [
        {
          name: "Ana Paula M.",
          role: "Presente de casamento",
          text: "Foi emocionante do início ao fim. A música captou exatamente a nossa história. Choramos ouvindo juntos pela primeira vez.",
          videoUrl: "https://www.youtube.com/",
        },
        {
          name: "Carlos R.",
          role: "Empresário",
          text: "Nunca imaginei que a essência da minha empresa pudesse virar música. O resultado foi sofisticado e marcante.",
          videoUrl: "https://www.youtube.com/",
        },
        {
          name: "Juliana S.",
          role: "Homenagem familiar",
          text: "Não é apenas um poema ou uma canção. É memória viva. Vale cada centavo.",
          videoUrl: "https://www.youtube.com/",
        },
      ],
    },
    rights: {
      title: "Direitos autorais",
      bullets: [
        "Os direitos autorais das obras permanecem com o autor.",
        "A contratação concede licença de uso pessoal (presente, evento privado, redes pessoais sem fins comerciais).",
        "Uso comercial/publicitário/político ou cessão de direitos: negociação separada.",
      ],
      checkoutText:
        "No checkout, inclua: “Estou ciente de que os direitos autorais permanecem com o autor e que a contratação concede apenas licença de uso pessoal.”",
    },
    faq: {
      title: "Perguntas frequentes",
      items: [
        {
          q: "Eu vou ser dono da música?",
          a: "Você recebe uma obra feita para você e uma licença de uso pessoal. Os direitos autorais permanecem com o autor. Se você precisar de uso comercial ou cessão, negociamos à parte.",
        },
        {
          q: "O que preciso enviar?",
          a: "Um resumo da história, nomes importantes, emoção desejada e (se quiser) referências musicais. Você pode mandar texto ou áudio.",
        },
        {
          q: "Quantos ajustes estão incluídos?",
          a: "Depende do pacote. Ajustes são para refinamento (tom, palavras, detalhes). Mudanças grandes podem virar novo pedido.",
        },
        {
          q: "Você publica no Spotify?",
          a: "Sim, como add-on. A publicação não muda a titularidade autoral. Créditos e eventuais divisões precisam estar definidos.",
        },
        {
          q: "Tem reembolso?",
          a: "Por ser obra personalizada, após o início do processo criativo não há reembolso. Antes do início, avaliamos caso a caso.",
        },
      ],
    },
    contact: {
      title: "Contato",
      subtitle: "Para dúvidas, propostas comerciais ou campanhas, fale comigo por Instagram ou e-mail.",
      fieldsNote:
        "Dica: use um formulário (Typeform/Tally/Google Forms) para coletar a história após o pagamento.",
      instagram: "Instagram",
      email: "E-mail",
      instaHint: "@cantesuavida",
      emailHint: "autor@cantesuavida.com",
    },
    footer:
      "© " +
      new Date().getFullYear() +
      " Cante sua Vida — Celebre com versos. Todos os direitos reservados.",
    lang: "PT-BR",
    switch: "EN",
    ctaSticky: "Comprar / Pedir proposta",
  },
  en: {
    nav: {
      how: "How it works",
      packs: "Packages",
      samples: "Samples",
      testimonials: "Testimonials",
      rights: "Copyright",
      faq: "FAQ",
      contact: "Contact",
    },
    hero: {
      kicker: "Sing Your Life",
      title: "Sing Your Life",
      subtitle:
        "Celebrate with verses. You share your story — I turn it into original poetry and music, made-to-order, with emotion and intention.",
      ctaPrimary: "Choose a package",
      ctaSecondary: "See how it works",
      note:
        "Pay by PIX or card (Brazil) • Digital delivery • Copyright stays with the author",
    },
    badges: [
      { icon: Sparkles, title: "Original", desc: "Created from scratch" },
      { icon: Clock, title: "Clear timelines", desc: "You know the delivery" },
      { icon: ShieldCheck, title: "Protected", desc: "Simple, clear terms" },
    ],
    how: {
      title: "How it works",
      steps: [
        { icon: Mic2, title: "1) You share the story", desc: "Fill a short form (or send audio/text)." },
        { icon: Music, title: "2) I create the piece", desc: "I turn the plot into a poem and/or song in your chosen style." },
        { icon: BadgeCheck, title: "3) You receive it", desc: "Private link delivery with organized files (PDF/MP3/WAV)." },
      ],
      cta: "Start my journey",
    },
    packs: {
      title: "Packages",
      subtitle: "Premium ladder (Brazil). You commission a one-of-one piece — not a generic product.",
      items: [
        {
          id: "poema",
          name: "Custom Original Poem",
          price: 660,
          lead: "The base minimum. Your story becomes poetry with a signature.",
          includes: ["Exclusive poem (up to 30 lines)", "1 refinement round", "Delivery: PDF + text", "Personal-use license"],
          delivery: "Delivery: 24–48h (standard)",
          cta: "Buy Poem",
          tag: "Best seller",
        },
        {
          id: "essencial",
          name: "Essential Original Song",
          price: 1320,
          lead: "Your story stops being read — it becomes heard.",
          includes: ["Original lyrics + full song", "Chosen genre", "Vocal + instrumental", "MP3", "1 refinement round", "Personal-use license"],
          delivery: "Delivery: 72h (standard)",
          cta: "Buy Song",
          tag: "Premium",
        },
        {
          id: "premium",
          name: "Premium Poetic Journey",
          price: 2490,
          lead: "A complete piece for moments you’ll never repeat.",
          includes: ["Poem + full song", "2 refinement rounds", "Short version (30–45s) + full (2–3 min)", "Simple cover art", "MP3 + WAV"],
          delivery: "Delivery: 7 days (standard)",
          cta: "Buy Premium",
          tag: "Full experience",
        },
        {
          id: "jingle",
          name: "Professional Jingle / Campaign",
          priceText: "from R$ 4,900",
          lead: "A sonic identity built for recall and impact.",
          includes: ["Commercial-use license", "15s / 30s / 60s variations", "Lyrics + music", "License agreement included"],
          delivery: "Delivery: by proposal",
          cta: "Request a quote",
          tag: "Commercial",
        },
      ],
      addOnsTitle: "Add-ons",
      addOns: [
        { name: "Streaming release (Spotify & more)", price: 660, desc: "Distribution + ISRC + credits + final cover. Copyright remains with the author." },
        { name: "Rush 48h", priceText: "+ R$ 490", desc: "Priority in the production queue." },
        { name: "Rush 24h", priceText: "+ R$ 990", desc: "24h delivery (when available)." },
      ],
      disclaimer: "Commercial use is not included in personal packages. For business/ads/campaigns, request a quote.",
    },
    samples: {
      title: "Samples",
      subtitle: "Add 6–10 demos (audio) and short lyric excerpts. I can help you organize the portfolio by category.",
      placeholder: "(Placeholder) • Sample 1 — Wedding • Sample 2 — Business • Sample 3 — Tribute • Sample 4 — Jingle",
    },
    testimonials: {
      title: "What clients say",
      subtitle: "Real stories from people who turned feelings into poetry and music.",
      cta: "Watch video",
      items: [
        { name: "Ana Paula M.", role: "Wedding gift", text: "Emotional from start to finish. The song captured our story perfectly.", videoUrl: "https://www.youtube.com/" },
        { name: "Carlos R.", role: "Business owner", text: "I never imagined my company’s essence could become a song.", videoUrl: "https://www.youtube.com/" },
        { name: "Juliana S.", role: "Family tribute", text: "It’s not just a poem or a song. It’s living memory.", videoUrl: "https://www.youtube.com/" },
      ],
    },
    rights: {
      title: "Copyright",
      bullets: [
        "Copyright remains with the author.",
        "Your purchase grants a personal-use license (gifts, private events, personal socials without commercial intent).",
        "Commercial licensing or copyright transfer: negotiated separately.",
      ],
      checkoutText:
        "At checkout, include: “I understand copyright remains with the author and my purchase grants a personal-use license only.”",
    },
    faq: {
      title: "FAQ",
      items: [
        { q: "Do I own the song?", a: "You receive a bespoke piece plus a personal-use license. Copyright remains with the author." },
        { q: "What do I need to send?", a: "A short story summary, key names, and the emotion you want. Text or audio works." },
        { q: "How many revisions are included?", a: "It depends on the package. Revisions are for refinement." },
        { q: "Can you publish to Spotify?", a: "Yes, as an add-on. Publishing does not change copyright." },
        { q: "Refunds?", a: "Because it’s custom work, once creation starts, refunds are not available." },
      ],
    },
    contact: {
      title: "Contact",
      subtitle: "For questions, commercial quotes, or campaigns, reach out via Instagram or email.",
      fieldsNote: "Tip: use a form (Typeform/Tally/Google Forms) to collect the story after payment.",
      instagram: "Instagram",
      email: "Email",
      instaHint: "@cantesuavida",
      emailHint: "autor@cantesuavida.com",
    },
    footer:
      "© " +
      new Date().getFullYear() +
      " Sing Your Life — Celebrate with verses. All rights reserved.",
    lang: "EN",
    switch: "PT-BR",
    ctaSticky: "Buy / Request quote",
  },
};

const Section = ({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
    <div className="mb-8">
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
      {subtitle ? (
        <p className="mt-2 text-base sm:text-lg text-neutral-600 max-w-3xl">{subtitle}</p>
      ) : null}
    </div>
    {children}
  </section>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-3 py-1 text-xs text-neutral-700 shadow-sm">
    {children}
  </span>
);

const LogoMark = () => (
  <div
    className={`h-9 w-9 rounded-2xl bg-gradient-to-br ${ACCENT.from} ${ACCENT.via} ${ACCENT.to} text-white flex items-center justify-center shadow-sm`}
  >
    <Music className="h-5 w-5" />
  </div>
);

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={
      "rounded-2xl border border-neutral-200 bg-white/90 backdrop-blur shadow-sm hover:shadow-md transition-shadow " +
      className
    }
  >
    {children}
  </div>
);

const AnchorButton = ({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition-all";
  const styles =
    variant === "primary"
      ? `bg-gradient-to-r ${ACCENT.from} ${ACCENT.via} ${ACCENT.to} text-white shadow-sm hover:opacity-95`
      : "bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50";
  return (
    <a href={href} className={`${base} ${styles}`}>
      {children} <ChevronRight className="h-4 w-4" />
    </a>
  );
};

function Navbar({
  t,
  onToggle,
  lang,
}: {
  t: Copy;
  onToggle: () => void;
  lang: Lang;
}) {
  return (
    <div className="sticky top-0 z-50 backdrop-blur bg-white/75 border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <LogoMark />
          <div className="leading-tight">
            <div className="text-sm font-semibold">{t.hero.kicker}</div>
            <div className="text-xs text-neutral-500">{t.hero.title}</div>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-6 text-sm text-neutral-700">
          <a href="#how" className="hover:text-neutral-900">
            {t.nav.how}
          </a>
          <a href="#packs" className="hover:text-neutral-900">
            {t.nav.packs}
          </a>
          <a href="#samples" className="hover:text-neutral-900">
            {t.nav.samples}
          </a>
          <a href="#testimonials" className="hover:text-neutral-900">
            {t.nav.testimonials}
          </a>
          <a href="#rights" className="hover:text-neutral-900">
            {t.nav.rights}
          </a>
          <a href="#faq" className="hover:text-neutral-900">
            {t.nav.faq}
          </a>
          <a href="#contact" className="hover:text-neutral-900">
            {t.nav.contact}
          </a>
        </div>

        <button
          onClick={onToggle}
          className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-50"
          aria-label="Toggle language"
        >
          <Globe className="h-4 w-4" />
          <span className="font-medium">{lang === "pt" ? "PT-BR" : "EN"}</span>
          <span className="text-neutral-400">→</span>
          <span className="font-medium">{t.switch}</span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>("pt");
  const t = useMemo(() => copy[lang], [lang]);

  const CHECKOUT_URLS: Record<string, string> = {
    poema: "https://mpago.la/2X8tD5u",
    essencial: "https://mpago.la/1KLYWfp",
    premium: "https://mpago.la/2DaMBNL",
    jingle: "https://mpago.la/2caA6zw",
    proposta: "https://mpago.la/2caA6zw",
  };

  const openCheckout = (id: string) => {
    const url = CHECKOUT_URLS[id];
    if (url && url.trim()) window.open(url, "_blank", "noopener,noreferrer");
    else alert("Link de pagamento não configurado.");
  };

  return (
    <div id="top" className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Fundo colorido leve */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className={`absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-br ${ACCENT.from} ${ACCENT.to} opacity-15 blur-3xl`}
        />
        <div
          className={`absolute top-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br ${ACCENT.via} ${ACCENT.to} opacity-12 blur-3xl`}
        />
        <div
          className={`absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-gradient-to-br ${ACCENT.from} ${ACCENT.via} opacity-10 blur-3xl`}
        />
      </div>

      <Navbar t={t} lang={lang} onToggle={() => setLang((p) => (p === "pt" ? "en" : "pt"))} />

      {/* HERO */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-2 mb-5"
            >
              <Pill>
                <Sparkles className="h-3.5 w-3.5" />
                {t.hero.kicker}
              </Pill>
              <Pill>
                <ShieldCheck className="h-3.5 w-3.5" />
                {lang === "pt" ? "Direitos protegidos" : "Protected"}
              </Pill>
              <Pill>
                <Clock className="h-3.5 w-3.5" />
                {lang === "pt" ? "Entrega digital" : "Digital delivery"}
              </Pill>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
              <span
                className={`bg-gradient-to-r ${ACCENT.from} ${ACCENT.via} ${ACCENT.to} bg-clip-text text-transparent`}
              >
                {t.hero.title}
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-xl">
              {t.hero.subtitle}
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <AnchorButton href="#packs" variant="primary">
                {t.hero.ctaPrimary}
              </AnchorButton>
              <AnchorButton href="#how" variant="secondary">
                {t.hero.ctaSecondary}
              </AnchorButton>
            </div>

            <p className="mt-5 text-xs text-neutral-500 max-w-xl">{t.hero.note}</p>
          </div>

          <div className="grid gap-4">
            <Card className="p-6">
              <div className="text-sm font-semibold">
                {lang === "pt" ? "O que você recebe" : "What you get"}
              </div>
              <p className="mt-1 text-sm text-neutral-600">
                {lang === "pt"
                  ? "Arquivos organizados e prontos para usar."
                  : "Organized files ready to use."}
              </p>
            </Card>

            <div className="grid sm:grid-cols-3 gap-4">
              {t.badges.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <Card key={idx} className="p-5">
                    <div className="h-10 w-10 rounded-2xl bg-neutral-100 flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="mt-3 text-sm font-semibold">{b.title}</div>
                    <div className="text-sm text-neutral-600">{b.desc}</div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* COMO FUNCIONA */}
      <Section id="how" title={t.how.title}>
        <div className="grid md:grid-cols-3 gap-4">
          {t.how.steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Card key={idx} className="p-6">
                <div className="h-11 w-11 rounded-2xl bg-neutral-100 flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 text-sm font-semibold">{s.title}</div>
                <div className="mt-1 text-sm text-neutral-600">{s.desc}</div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* PACOTES */}
      <Section id="packs" title={t.packs.title} subtitle={t.packs.subtitle}>
        <div className="grid lg:grid-cols-4 gap-4">
          {t.packs.items.map((p) => {
            const isCustom = !!p.priceText;
            return (
              <Card key={p.id} className="p-6 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold">{p.name}</div>
                    <div className="mt-1 text-2xl font-semibold">
                      {isCustom ? p.priceText : currencyBRL(p.price || 0)}
                    </div>
                    <div className="mt-2 text-sm text-neutral-600">{p.lead}</div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full bg-gradient-to-r ${ACCENT.from} ${ACCENT.via} ${ACCENT.to} text-white text-xs px-3 py-1`}
                  >
                    {p.tag}
                  </span>
                </div>

                <div className="mt-4 text-xs text-neutral-500">{p.delivery}</div>

                <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                  {p.includes.map((it, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neutral-900" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openCheckout(p.id)}
                  className={`mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${ACCENT.from} ${ACCENT.via} ${ACCENT.to} text-white px-5 py-3 text-sm font-medium hover:opacity-95`}
                >
                  {p.cta} <ChevronRight className="h-4 w-4" />
                </button>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* DEPOIMENTOS (CLICÁVEL) */}
      <Section id="testimonials" title={t.testimonials.title} subtitle={t.testimonials.subtitle}>
        <div className="grid md:grid-cols-3 gap-4">
          {t.testimonials.items.map((dep, idx) => (
            <Card key={idx} className="p-6">
              <div className="text-sm text-neutral-700 italic">“{dep.text}”</div>

              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{dep.name}</div>
                  <div className="text-xs text-neutral-500">{dep.role}</div>
                </div>

                {dep.videoUrl ? (
                  <a
                    href={dep.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-800 hover:bg-neutral-50"
                    title="Abrir vídeo no YouTube"
                  >
                    <Play className="h-4 w-4" />
                    {t.testimonials.cta}
                  </a>
                ) : null}
              </div>
            </Card>
          ))}
        </div>

        <p className="mt-4 text-xs text-neutral-500">
          ✅ Para trocar os vídeos: edite os links <b>videoUrl</b> nos depoimentos.
        </p>
      </Section>

      {/* CONTATO (SEM WHATSAPP) */}
      <Section id="contact" title={t.contact.title} subtitle={t.contact.subtitle}>
        <div className="grid md:grid-cols-2 gap-4">
          <a
            className="rounded-2xl border border-neutral-200 bg-white/90 p-5 hover:bg-neutral-50"
            href="https://instagram.com/cantesuavida"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-2xl bg-neutral-100 flex items-center justify-center">
                <Instagram className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">{t.contact.instagram}</div>
                <div className="text-sm text-neutral-600">{t.contact.instaHint}</div>
              </div>
            </div>
          </a>

          <a
            className="rounded-2xl border border-neutral-200 bg-white/90 p-5 hover:bg-neutral-50"
            href="mailto:autor@cantesuavida.com"
          >
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-2xl bg-neutral-100 flex items-center justify-center">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">{t.contact.email}</div>
                <div className="text-sm text-neutral-600">{t.contact.emailHint}</div>
              </div>
            </div>
          </a>
        </div>

        <div className="mt-4 text-xs text-neutral-500">{t.contact.fieldsNote}</div>
      </Section>

      <footer className="border-t border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-xs text-neutral-500">
          {t.footer}
        </div>
      </footer>
    </div>
  );
}
