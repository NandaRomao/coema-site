// Diário de bordo: lê data/diario.json, valida cada entrada e monta a linha do tempo.
// O JSON é tratado como dado não confiável: nada entra na página sem validação,
// e todo o conteúdo é inserido com textContent, nunca com innerHTML.

const TAGS = new Map([
  ["pesquisa", "Pesquisa"],
  ["design", "Design"],
  ["desenvolvimento", "Desenvolvimento"],
  ["validacao", "Validação"],
  ["evento", "Evento"],
  ["equipe", "Equipe"],
]);

const POR_PAGINA = 6;
const FORMATO_DATA = /^\d{4}-\d{2}-\d{2}$/;

const formatoDia = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric" });
const formatoMes = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" });

// Meio-dia evita que o fuso horário empurre a data para o dia anterior.
const paraData = (texto) => new Date(`${texto}T12:00:00`);

const textoValido = (valor, maximo) =>
  typeof valor === "string" && valor.trim().length > 0 && valor.length <= maximo;

function entradaValida(entrada) {
  if (typeof entrada !== "object" || entrada === null) return false;
  if (typeof entrada.data !== "string" || !FORMATO_DATA.test(entrada.data)) return false;
  if (Number.isNaN(paraData(entrada.data).getTime())) return false;
  if (!textoValido(entrada.titulo, 80)) return false;
  if (!textoValido(entrada.texto, 600)) return false;
  if (!textoValido(entrada.autor, 60)) return false;
  if (!TAGS.has(entrada.tag)) return false;
  if (entrada.link !== undefined) {
    if (typeof entrada.link !== "string" || !entrada.link.startsWith("https://")) return false;
  }
  return true;
}

function criar(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto !== undefined) elemento.textContent = texto;
  return elemento;
}

function criarRegistro(entrada) {
  const item = criar("li", "registro");
  const artigo = criar("article");
  artigo.tabIndex = -1;

  const data = criar("time", "registro__data", formatoDia.format(paraData(entrada.data)));
  data.dateTime = entrada.data;

  artigo.append(
    data,
    criar("h4", "registro__titulo", entrada.titulo),
    criar("p", "", entrada.texto),
    criar("p", "registro__meta", `${entrada.autor} · ${TAGS.get(entrada.tag)}`),
  );

  if (entrada.link) {
    const paragrafo = criar("p");
    const link = criar("a", "", "Saiba mais");
    link.href = entrada.link;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    paragrafo.append(link);
    artigo.append(paragrafo);
  }

  item.append(artigo);
  return item;
}

export async function iniciarDiario() {
  const raiz = document.querySelector("[data-diario]");
  if (!raiz) return;

  const filtros = raiz.querySelector(".diario__filtros");
  const status = raiz.querySelector(".diario__status");
  const lista = raiz.querySelector(".diario__lista");
  const botaoMais = raiz.querySelector(".diario__mais");

  let entradas = [];
  try {
    const resposta = await fetch(raiz.dataset.fonte, { cache: "no-cache" });
    if (!resposta.ok) throw new Error("Resposta inválida");
    const dados = await resposta.json();
    if (!Array.isArray(dados)) throw new Error("Formato inválido");
    entradas = dados.filter(entradaValida).sort((a, b) => b.data.localeCompare(a.data));
  } catch {
    status.textContent = "O diário não pôde ser carregado agora. Tente de novo mais tarde.";
    return;
  }

  if (entradas.length === 0) {
    status.textContent = "Ainda não há registros.";
    return;
  }

  let filtro = "todos";
  let visiveis = POR_PAGINA;

  const filtradas = () => (filtro === "todos" ? entradas : entradas.filter((e) => e.tag === filtro));

  const desenhar = () => {
    const todas = filtradas();
    const mostradas = todas.slice(0, visiveis);
    lista.replaceChildren();

    let mesAtual = "";
    let grupo = null;
    for (const entrada of mostradas) {
      const mes = entrada.data.slice(0, 7);
      if (mes !== mesAtual) {
        mesAtual = mes;
        const nomeMes = formatoMes.format(paraData(entrada.data));
        lista.append(criar("h3", "diario__mes", nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1)));
        grupo = criar("ol", "registros");
        lista.append(grupo);
      }
      grupo.append(criarRegistro(entrada));
    }

    const plural = todas.length === 1 ? "registro" : "registros";
    status.textContent = `Mostrando ${mostradas.length} de ${todas.length} ${plural}.`;
    botaoMais.hidden = mostradas.length >= todas.length;
  };

  const tagsEmUso = [...TAGS.keys()].filter((tag) => entradas.some((e) => e.tag === tag));
  for (const [valor, nome] of [["todos", "Todos"], ...tagsEmUso.map((t) => [t, TAGS.get(t)])]) {
    const botao = criar("button", "diario__filtro", nome);
    botao.type = "button";
    botao.dataset.filtro = valor;
    botao.setAttribute("aria-pressed", String(valor === filtro));
    filtros.append(botao);
  }

  filtros.addEventListener("click", (evento) => {
    const botao = evento.target.closest(".diario__filtro");
    if (!botao) return;
    filtro = botao.dataset.filtro;
    visiveis = POR_PAGINA;
    for (const outro of filtros.children) {
      outro.setAttribute("aria-pressed", String(outro === botao));
    }
    desenhar();
  });

  botaoMais.addEventListener("click", () => {
    const anteriores = visiveis;
    visiveis += POR_PAGINA;
    desenhar();
    const novos = lista.querySelectorAll(".registro article");
    if (novos[anteriores]) novos[anteriores].focus();
  });

  desenhar();
}