import React, { useMemo, useState, useEffect } from "react";

const currencyBRL = (n: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(n);

type Lang = "pt" | "en";

export default function WebsiteHistoriasParaMusica() {
  const [lang, setLang] = useState<Lang>("pt");

  const t = useMemo(() => {
    if (lang === "pt") {
      return {
        title: "Cante sua Vida",
        subtitle: "Celebre com versos. Transforme sua história em arte.",
        buy: "COMPRAR",
      };
    }
    return {
      title: "Sing Your Life",
      subtitle: "Celebrate with verses. Turn your story into art.",
      buy: "BUY",
    };
  }, [lang]);

  // ✅ SORO SCRIPT (CORRETO)
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://app.trysoro.com/api/embed/a86f1ceb-1564-41b1-bd74-8993002d1e9c";
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="font-sans text-neutral-900">

      {/* NAV */}
      <header className="flex justify-between items-center px-6 py-4 border-b">
        <div className="font-bold text-xl">Cante sua Vida</div>

        <div className="flex gap-4">
          <button onClick={() => setLang("pt")}>PT</button>
          <button onClick={() => setLang("en")}>EN</button>
        </div>
      </header>

      {/* HERO */}
      <section className="text-center py-20 px-6">
        <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
        <p className="text-lg text-neutral-600">{t.subtitle}</p>
      </section>

      {/* PACOTES */}
      <section className="px-6 py-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Pacotes</h2>

        <div className="grid gap-6">

          <div className="border p-6 rounded-xl">
            <h3 className="font-bold">Poema Autoral</h3>
            <p>{currencyBRL(660)}</p>
            <button className="mt-4 bg-black text-white px-4 py-2 rounded">
              {t.buy}
            </button>
          </div>

          <div className="border p-6 rounded-xl">
            <h3 className="font-bold">Canção Autoral</h3>
            <p>{currencyBRL(1320)}</p>
            <button className="mt-4 bg-black text-white px-4 py-2 rounded">
              {t.buy}
            </button>
          </div>

        </div>
      </section>

      {/* ✅ SORO BLOG */}
      <section className="border-t py-20 px-6">
        <div className="max-w-5xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold">Blog & Inspirações</h2>
          <p className="text-neutral-600 mt-2">
            Histórias, versos e bastidores criativos.
          </p>
        </div>

        <div id="soro-blog"></div>
      </section>

      {/* CONTATO */}
      <section className="border-t py-12 text-center">
        <h2 className="text-xl font-bold mb-4">Contato</h2>

        <p>
          Instagram:{" "}
          <a
            href="https://instagram.com/cantesuavida"
            target="_blank"
          >
            @cantesuavida
          </a>
        </p>

        <p>
          Email:{" "}
          <a href="mailto:autor@cantesuavida.com">
            autor@cantesuavida.com
          </a>
        </p>
      </section>

      <footer className="text-center py-6 text-sm text-neutral-500">
        © 2026 Cante sua Vida
      </footer>
    </div>
  );
}
