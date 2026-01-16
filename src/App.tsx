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
} from "lucide-react";

// ---------- Theme ----------
const ACCENT = {
  from: "from-fuchsia-500",
  via: "via-violet-500",
  to: "to-sky-500",
};

// ---------- Utils ----------
const currencyBRL = (n: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(n);

type Lang = "pt" | "en";

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

type AddOn = {
  name: string;
  desc: string;
  price?: number;
  priceText?: string;
};

type Copy = {
  nav: {
    how: string;
    packs: string;
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
    addOns: AddOn[];
    disclaimer: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: { name: string; role: string; text: string }[];
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
    instagramLabel: string;
    emailLabel: string;
    instaHint: string;
    emailHint: string;
    ctaLine: string;
    btnInstagram: string;
    btnCopyEmail: string;
    copied: string;
    copyFail: string;
  };
  footer: string;
  switch: string;
  ctaSticky: string;
};

const copy: Record<Lang, Copy> = {
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
      kicker: "Cante sua Vida",
      title: "Cante sua Vida",
      subtitle:
        "Celebre com versos. Você conta sua história — eu transformo em poesia e música autorais, sob encomenda, com emoção e intenção.",
      ctaPrimary: "Escolher um pacote",
      ctaSecondary: "Ver como funciona",
      note: "Pagamento por PIX ou cartão • Entrega digital • Direitos autorais permanecem com o autor",
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
        "Você encomenda uma obra sob medida e recebe um resultado exclusivo — criado a partir da sua história.",
      items: [
        {
          id: "poema",
          name: "Poema Autoral Personalizado",
          price: 660,
          lead: "Sua história se torna poesia com assinatura.",
          includes: [
            "Poema exclusivo (até 30 versos)",
            "1 ajuste fino",
            "Entrega: PDF + texto",
            "Uso pessoal",
          ],
          delivery: "Prazo: 24–48h (padrão)",
          cta: "COMPRAR",
          tag: "Mais vendido",
        },
        {
          id: "essencial",
          name: "Canção Autoral Essencial",
          price: 1320,
          lead: "Sua história pode ser lida e também ouvida.",
          includes: [
            "Letra autoral + música completa",
            "Estilo musical escolhido",
            "Voz + instrumental",
            "MP3",
            "1 ajuste",
            "Uso pessoal",
          ],
          delivery: "Prazo: 72h (padrão)",
          cta: "COMPRAR",
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
          cta: "COMPRAR",
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
          cta: "PEDIR PROPOSTA",
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
    testimonials: {
      title: "O que dizem os clientes",
      subtitle: "Histórias reais de quem transformou sentimentos em poesia e música.",
      items: [
        {
          name: "Ana Paula M.",
          role: "Presente de casamento",
          text: "Foi emocionante do início ao fim. A música captou exatamente a nossa história. Choramos ouvindo juntos pela primeira vez.",
        },
        {
          name: "Carlos R.",
          role: "Empresário",
          text: "Nunca imaginei que a essência da minha empresa pudesse virar música. O resultado foi sofisticado e marcante.",
        },
        {
          name: "Juliana S.",
          role: "Homenagem familiar",
          text: "Não é apenas um poema ou uma canção. É memória viva. Vale cada centavo.",
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
      subtitle: "Para dúvidas, propostas comerciais ou campanhas:",
      instagramLabel: "Instagram",
      emailLabel: "E-mail",
      instaHint: "@cantesuavida",
      emailHint: "autor@cantesuavida.com",
      ctaLine: "Para mais informações, fale conosco pelo Instagram ou por e-mail.",
      btnInstagram: "Enviar mensagem no Instagram",
      btnCopyEmail: "Copiar e-mail",
      copied: "Copiado!",
      copyFail: "Não consegui copiar automaticamente. Copie manualmente.",
    },
    footer: `© ${new Date().getFullYear()} Cante sua Vida — Celebre com versos. Todos os direitos reservados.`,
    switch: "EN",
    ctaSticky: "Comprar / Pedir proposta",
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
      kicker: "Sing Your Life",
      title: "Sing Your Life",
      subtitle:
        "Celebrate with verses. You share your story — I turn it into original poetry and music, made-to-order, with emotion and intention.",
      ctaPrimary: "Choose a package",
      ctaSecondary: "See how it works",
      note: "Pay by PIX or card (Brazil) • Digital delivery • Copyright stays with the author",
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
      subtitle: "You commission a custom-made piece and receive an exclusive result — created from your story.",
      items: [
        {
          id: "poema",
          name: "Custom Original Poem",
          price: 660,
          lead: "Your story becomes signed poetry.",
          includes: ["Exclusive poem (up to 30 lines)", "1 refinement round", "Delivery: PDF + text", "Personal-use license"],
          delivery: "Delivery: 24–48h (standard)",
          cta: "BUY",
          tag: "Best seller",
        },
        {
          id: "essencial",
          name: "Essential Original Song",
          price: 1320,
          lead: "Your story can be read and also heard.",
          includes: ["Original lyrics + full song", "Chosen genre", "Vocal + instrumental", "MP3", "1 refinement round", "Personal-use license"],
          delivery: "Delivery: 72h (standard)",
          cta: "BUY",
          tag: "Premium",
        },
        {
          id: "premium",
          name: "Premium Poetic Journey",
          price: 2490,
          lead: "A complete piece for moments you’ll never repeat.",
          includes: ["Poem + full song", "2 refinement rounds", "Short (30–45s) + full (2–3 min)", "Simple cover art", "MP3 + WAV"],
          delivery: "Delivery: 7 days (standard)",
          cta: "BUY",
          tag: "Full experience",
        },
        {
          id: "jingle",
          name: "Professional Jingle / Campaign",
          priceText: "from R$ 4,900",
          lead: "A sonic identity built for recall and impact.",
          includes: ["Commercial-use license", "15s / 30s / 60s variations", "Lyrics + music", "License agreement included"],
          delivery: "Delivery: by proposal",
          cta: "REQUEST A QUOTE",
          tag: "Commercial",
        },
      ],
      addOnsTitle: "Add-ons",
      addOns: [
        {
          name: "Streaming release (Spotify & more)",
          price: 660,
          desc: "Distribution + ISRC + credits + final cover. Copyright remains with the author.",
        },
        { name: "Rush 48h", priceText: "+ R$ 490", desc: "Priority in the production queue." },
        { name: "Rush 24h", priceText: "+ R$ 990", desc: "24h delivery (when available)." },
      ],
      disclaimer: "Commercial use is not included in personal packages. For business/ads/campaigns, request a quote.",
    },
    testimonials: {
      title: "What clients say",
      subtitle: "Real stories from people who turned feelings into poetry and music.",
      items: [
        {
          name: "Ana Paula M.",
          role: "Wedding gift",
          text: "Emotional from start to finish. The song captured our story perfectly. We cried listening together for the first time.",
        },
        {
          name: "Carlos R.",
          role: "Business owner",
          text: "I never imagined my company’s essence could become a song. The result was sophisticated and unforgettable.",
        },
        {
          name: "Juliana S.",
          role: "Family tribute",
          text: "It’s not just a poem or a song. It’s living memory. Worth every penny.",
        },
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
        {
          q: "Do I own the song?",
          a: "You receive a bespoke piece plus a personal-use license. Copyright remains with the author. If you need commercial use or a transfer, we’ll negotiate separately.",
        },
        {
          q: "What do I need to send?",
          a: "A short story summary, key names, the emotion you want, and (optional) reference tracks. Text or audio works.",
        },
        {
          q: "How many revisions are included?",
          a: "It depends on the package. Revisions are for refinement. Major scope changes may require a new order.",
        },
        {
          q: "Can you publish to Spotify?",
          a: "Yes, as an add-on. Publishing does not change copyright. Credits and any revenue splits must be defined.",
        },
        {
          q: "Refunds?",
          a: "Because it’s custom work, once creation starts, refunds are not available. Before it starts, we’ll review case by case.",
        },
      ],
    },
    contact: {
      title: "Contact",
      subtitle: "For questions, commercial quotes, or campaigns:",
      instagramLabel: "Instagram",
      emailLabel: "Email",
      instaHint: "@cantesuavida",
      emailHint: "autor@cantesuavida.com",
      ctaLine: "For more information, contact us via Instagram or email.",
      btnInstagram: "Message on Instagram",
      btnCopyEmail: "Copy email",
      copied: "Copied!",
      copyFail: "Could not auto-copy. Please copy manually.",
    },
    footer: `© ${new Date().getFullYear()} Sing Your Life — Celebrate with verses. All rights reserved.`,
    switch: "PT-BR",
    ctaSticky: "Buy / Request quote",
  },
};

const INSTAGRAM_HANDLE = "cantesuavida";
const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;
const EMAIL = "autor@cantesuavida.com";
const EMAIL_MAILTO = `mailto:${EMAIL}`;

const safeCopy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      return true;
    } catch {
      return false;
    } finally {
      document.body.removeChild(ta);
    }
  }
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
      {subtitle ? <p className="mt-2 text-base sm:text-lg text-neutral-600 max-w-3xl">{subtitle}</p> : null}
    </div>
    {children}
  </section>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-3 py-1 text-xs text-neutral-700 shadow-sm">
    {children}
  </span>
);

const LogoMark = () => (
  <div
    className={`h-9 w-9 rounded-2xl bg-gradient-to-br ${ACCENT.from} ${ACCENT.via} ${ACCENT.to} text-white flex items-center justify-center shadow-sm`}
    aria-hidden
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 3v10.2c-.6-.4-1.4-.6-2.2-.6-1.9 0-3.5 1.1-3.5 2.9S9.9 18.4 11.8 18.4c1.9 0 3.2-1 3.2-2.6V7.2l6-1.4V3.6L14 3z"
        fill="currentColor"
        opacity="0.92"
      />
      <path
        d="M5 20c3.8-1 6.6-3.3 8.5-6.7l1.3 1.3c-2.4 3.9-5.9 6.3-9.8 7.2V20z"
        fill="currentColor"
        opacity="0.75"
      />
    </svg>
  </div>
);

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow ${className}`}>
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
  const base = "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition-all";
  const styles =
    variant === "primary"
      ? `bg-gradient-to-r ${ACCENT.from} ${ACCENT.via} ${ACCENT.to} text-white shadow-sm hover:opacity-95`
      : "border border-neutral-200 bg-white hover:bg-neutral-50";
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
    <div className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <LogoMark />
          <div className="leading-tight">
            <div className="text-sm font-semibold">{t.hero.kicker}</div>
            <div className="text-xs text-neutral-500">{lang === "pt" ? "Celebre com versos" : "Celebrate with verses"}</div>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-6 text-sm text-neutral-700">
          <a href="#how" className="hover:text-neutral-900">{t.nav.how}</a>
          <a href="#packs" className="hover:text-neutral-900">{t.nav.packs}</a>
          <a href="#testimonials" className="hover:text-neutral-900">{t.nav.testimonials}</a>
          <a href="#rights" className="hover:text-neutral-900">{t.nav.rights}</a>
          <a href="#faq" className="hover:text-neutral-900">{t.nav.faq}</a>
          <a href="#contact" className="hover:text-neutral-900">{t.nav.contact}</a>
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

export default function WebsiteHistoriasParaMusica() {
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
    if (url && url.trim()) {
      const w = window.open(url, "_blank", "noopener,noreferrer");
      if (!w) window.location.href = url;
      return;
    }
    window.alert(lang === "pt" ? `Link de pagamento não configurado: ${id}` : `Payment link not configured: ${id}`);
  };

  const onCopyEmail = async () => {
    const ok = await safeCopy(EMAIL);
    window.alert(ok ? t.contact.copied : t.contact.copyFail);
  };

  return (
    <div id="top" className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* subtle background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className={`absolute -top-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-br ${ACCENT.from} ${ACCENT.to} opacity-15 blur-3xl`} />
        <div className={`absolute top-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br ${ACCENT.via} ${ACCENT.to} opacity-12 blur-3xl`} />
        <div className={`absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-gradient-to-br ${ACCENT.from} ${ACCENT.via} opacity-10 blur-3xl`} />
      </div>

      <Navbar t={t} lang={lang} onToggle={() => setLang((p) => (p === "pt" ? "en" : "pt"))} />

      {/* Hero */}
      <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-wrap gap-2 mb-5">
              <Pill><Sparkles className="h-3.5 w-3.5" />{t.hero.kicker}</Pill>
              <Pill><ShieldCheck className="h-3.5 w-3.5" />{lang === "pt" ? "Direitos protegidos" : "Protected"}</Pill>
              <Pill><Clock className="h-3.5 w-3.5" />{lang === "pt" ? "Entrega digital" : "Digital delivery"}</Pill>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl sm:text-5xl font-semibold tracking-tight">
              {t.hero.title}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mt-4 text-base sm:text-lg text-neutral-600 max-w-xl">
              {t.hero.subtitle}
            </motion.p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <AnchorButton href="#packs" variant="primary">{t.hero.ctaPrimary}</AnchorButton>
              <AnchorButton href="#how" variant="secondary">{t.hero.ctaSecondary}</AnchorButton>
            </div>

            <p className="mt-5 text-xs text-neutral-500 max-w-xl">{t.hero.note}</p>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="grid gap-4">
            <Card className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{lang === "pt" ? "O que você recebe" : "What you get"}</div>
                  <p className="mt-1 text-sm text-neutral-600">{lang === "pt" ? "Arquivos organizados e prontos para usar." : "Organized files ready to use."}</p>
                </div>
                <div className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${ACCENT.from} ${ACCENT.via} ${ACCENT.to} text-white flex items-center justify-center`}>
                  <BadgeCheck className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-neutral-200 p-3"><div className="font-medium">PDF</div><div className="text-neutral-600">{lang === "pt" ? "Poema/Letra" : "Poem/Lyrics"}</div></div>
                <div className="rounded-xl border border-neutral-200 p-3"><div className="font-medium">MP3 / WAV</div><div className="text-neutral-600">{lang === "pt" ? "Música" : "Song"}</div></div>
                <div className="rounded-xl border border-neutral-200 p-3"><div className="font-medium">Cover</div><div className="text-neutral-600">{lang === "pt" ? "Capa simples" : "Simple cover"}</div></div>
                <div className="rounded-xl border border-neutral-200 p-3"><div className="font-medium">Link privado</div><div className="text-neutral-600">{lang === "pt" ? "Entrega digital" : "Digital delivery"}</div></div>
              </div>
            </Card>

            <div className="grid sm:grid-cols-3 gap-4">
              {t.badges.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <Card key={idx} className="p-5">
                    <div className="h-10 w-10 rounded-2xl bg-neutral-100 flex items-center justify-center"><Icon className="h-5 w-5" /></div>
                    <div className="mt-3 text-sm font-semibold">{b.title}</div>
                    <div className="text-sm text-neutral-600">{b.desc}</div>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        </div>
      </header>

      {/* How */}
      <Section id="how" title={t.how.title}>
        <div className="grid md:grid-cols-3 gap-4">
          {t.how.steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Card key={idx} className="p-6">
                <div className="h-11 w-11 rounded-2xl bg-neutral-100 flex items-center justify-center"><Icon className="h-5 w-5" /></div>
                <div className="mt-4 text-sm font-semibold">{s.title}</div>
                <div className="mt-1 text-sm text-neutral-600">{s.desc}</div>
              </Card>
            );
          })}
        </div>
        <div className="mt-6 flex">
          <AnchorButton href="#packs" variant="primary">{t.how.cta}</AnchorButton>
        </div>
      </Section>

      {/* Packages */}
      <Section id="packs" title={t.packs.title} subtitle={t.packs.subtitle}>
        <div className="grid lg:grid-cols-4 gap-4">
          {t.packs.items.map((p) => {
            const isCustom = !!p.priceText;
            return (
              <Card key={p.id} className="p-6 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold">{p.name}</div>
                    <div className="mt-1 text-2xl font-semibold">{isCustom ? p.priceText : currencyBRL(p.price || 0)}</div>
                    <div className="mt-2 text-sm text-neutral-600">{p.lead}</div>
                  </div>
                  <span className={`shrink-0 rounded-full bg-gradient-to-r ${ACCENT.from} ${ACCENT.via} ${ACCENT.to} text-white text-xs px-3 py-1`}>{p.tag}</span>
                </div>

                <div className="mt-4 text-xs text-neutral-500">{p.delivery}</div>

                <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                  {p.includes.map((it, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className={`mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r ${ACCENT.from} ${ACCENT.to}`} />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openCheckout(p.id)}
                  className={`mt-auto pt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${ACCENT.from} ${ACCENT.via} ${ACCENT.to} text-white px-5 py-3 text-sm font-medium hover:opacity-95`}
                >
                  {p.cta} <ChevronRight className="h-4 w-4" />
                </button>

                <p className="mt-3 text-[11px] text-neutral-500">{lang === "pt" ? "PIX (Brasil) • cartão/boleto • entrega digital" : "PIX (Brazil) • card/boleto • digital delivery"}</p>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          <Card className="p-6 md:col-span-2">
            <div className="text-sm font-semibold">{t.packs.addOnsTitle}</div>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              {t.packs.addOns.map((a, idx) => (
                <div key={idx} className="rounded-2xl border border-neutral-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-sm font-medium">{a.name}</div>
                    <div className="text-sm font-semibold">{a.priceText ? a.priceText : currencyBRL(a.price || 0)}</div>
                  </div>
                  <div className="mt-2 text-sm text-neutral-600">{a.desc}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-neutral-500">{t.packs.disclaimer}</div>
          </Card>

          <Card className="p-6">
            <div className="text-sm font-semibold">{lang === "pt" ? "Briefing / História" : "Brief / Story"}</div>
            <p className="mt-2 text-sm text-neutral-600">{lang === "pt" ? "Após o pagamento, você envia a história por formulário." : "After payment, you send the story via a form."}</p>
            <div className="mt-4 rounded-2xl border border-dashed border-neutral-300 p-4 text-sm text-neutral-600">
              {lang === "pt" ? "Cole aqui o link do seu formulário (Typeform/Tally/Google Forms)." : "Paste your form link here (Typeform/Tally/Google Forms)."}
              <div className="mt-3">
                <a
                  className="inline-flex items-center gap-2 text-neutral-900 underline"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.alert(lang === "pt" ? "Troque este link pelo link real do seu formulário." : "Replace this link with your real form link.");
                  }}
                >
                  {lang === "pt" ? "Link do formulário" : "Form link"} <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Testimonials */}
      <Section id="testimonials" title={t.testimonials.title} subtitle={t.testimonials.subtitle}>
        <div className="grid md:grid-cols-3 gap-4">
          {t.testimonials.items.map((dep, idx) => (
            <Card key={idx} className="p-6">
              <div className="text-sm font-semibold">{dep.name}</div>
              <div className="mt-1 text-xs text-neutral-500">{dep.role}</div>
              <p className="mt-3 text-sm text-neutral-700 leading-relaxed">“{dep.text}”</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Rights */}
      <Section id="rights" title={t.rights.title}>
        <Card className="p-6">
          <ul className="space-y-2 text-sm text-neutral-700">
            {t.rights.bullets.map((b, idx) => (
              <li key={idx} className="flex gap-2">
                <span className={`mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r ${ACCENT.from} ${ACCENT.to}`} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-xs text-neutral-500">{t.rights.checkoutText}</div>
        </Card>
      </Section>

      {/* FAQ */}
      <Section id="faq" title={t.faq.title}>
        <div className="grid md:grid-cols-2 gap-4">
          {t.faq.items.map((it, idx) => (
            <Card key={idx} className="p-6">
              <div className="text-sm font-semibold">{it.q}</div>
              <div className="mt-2 text-sm text-neutral-600">{it.a}</div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title={t.contact.title} subtitle={t.contact.subtitle}>
        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-neutral-200 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{t.contact.instagramLabel}</div>
                  <div className="mt-1 text-sm text-neutral-600">{t.contact.instaHint}</div>
                </div>
                <div className="h-10 w-10 rounded-2xl bg-neutral-100 flex items-center justify-center"><Instagram className="h-5 w-5" /></div>
              </div>
              <div className="mt-4">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${ACCENT.from} ${ACCENT.via} ${ACCENT.to} text-white px-4 py-2 text-sm font-medium hover:opacity-95`}
                >
                  {t.contact.btnInstagram} <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{t.contact.emailLabel}</div>
                  <div className="mt-1 text-sm text-neutral-600"><a className="underline" href={EMAIL_MAILTO}>{t.contact.emailHint}</a></div>
                </div>
                <div className="h-10 w-10 rounded-2xl bg-neutral-100 flex items-center justify-center"><Mail className="h-5 w-5" /></div>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <a href={EMAIL_MAILTO} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50">
                  {lang === "pt" ? "Enviar e-mail" : "Send email"} <ChevronRight className="h-4 w-4" />
                </a>
                <button onClick={onCopyEmail} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50">
                  {t.contact.btnCopyEmail}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-5 text-sm text-neutral-700">{t.contact.ctaLine}</div>
        </Card>
      </Section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-sm text-neutral-600">{t.footer}</div>
          <div className="flex items-center gap-3 text-sm text-neutral-700">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-neutral-900">
              <Instagram className="h-4 w-4" />
              <span>{t.contact.instaHint}</span>
            </a>
            <span className="text-neutral-300">•</span>
            <a href={EMAIL_MAILTO} className="inline-flex items-center gap-2 hover:text-neutral-900">
              <Mail className="h-4 w-4" />
              <span>{EMAIL}</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Sticky CTA */}
      <div className="fixed bottom-4 left-0 right-0 z-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl border border-neutral-200 bg-white/90 backdrop-blur shadow-sm p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="text-sm text-neutral-700">
              <span className="font-semibold">{lang === "pt" ? "Pronto para encomendar?" : "Ready to commission?"}</span>
              <span className="text-neutral-500"> {lang === "pt" ? "Escolha um pacote e finalize." : "Pick a package and checkout."}</span>
            </div>
            <div className="flex gap-2">
              <a href="#packs" className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${ACCENT.from} ${ACCENT.via} ${ACCENT.to} text-white px-4 py-2 text-sm font-medium hover:opacity-95`}>
                {t.ctaSticky} <ChevronRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50">
                {t.nav.contact} <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
