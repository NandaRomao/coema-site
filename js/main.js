// Ponto de entrada. Cada função cuida de uma parte da página.

document.documentElement.classList.add("js");

function iniciarMenu() {
  const botao = document.querySelector(".cabecalho__botao");
  const menu = document.querySelector("#menu-principal");
  if (!botao || !menu) return;

  const fechar = () => {
    menu.classList.remove("menu--aberto");
    botao.setAttribute("aria-expanded", "false");
  };

  botao.addEventListener("click", () => {
    const aberto = menu.classList.toggle("menu--aberto");
    botao.setAttribute("aria-expanded", String(aberto));
  });

  menu.addEventListener("click", (evento) => {
    if (evento.target.closest("a")) fechar();
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      fechar();
      botao.focus();
    }
  });
}

// Seção 4: em tela larga, os pares viram abas verticais.
// Sem JavaScript ou no celular, todas as respostas ficam visíveis em sequência.
function iniciarPares() {
  const raiz = document.querySelector("[data-pares]");
  if (!raiz) return;

  const lista = raiz.querySelector(".pares__abas");
  const paineis = Array.from(raiz.querySelectorAll(".par"));
  const telaLarga = window.matchMedia("(min-width: 52rem)");
  let atual = 0;

  const abas = paineis.map((painel, indice) => {
    const aba = document.createElement("button");
    aba.type = "button";
    aba.className = "pares__aba";
    aba.id = `aba-${indice + 1}`;
    aba.setAttribute("role", "tab");
    aba.setAttribute("aria-controls", painel.id);
    aba.textContent = painel.querySelector(".par__dor").textContent.replace(/\s+/g, " ").trim();
    lista.append(aba);
    return aba;
  });

  const selecionar = (indice, focar) => {
    atual = indice;
    abas.forEach((aba, i) => {
      const ativa = i === indice;
      aba.setAttribute("aria-selected", String(ativa));
      aba.tabIndex = ativa ? 0 : -1;
      paineis[i].hidden = !ativa;
    });
    if (focar) abas[indice].focus();
  };

  const aplicar = () => {
    const usarAbas = telaLarga.matches;
    raiz.classList.toggle("pares--abas", usarAbas);
    lista.hidden = !usarAbas;

    paineis.forEach((painel, i) => {
      if (usarAbas) {
        painel.setAttribute("role", "tabpanel");
        painel.setAttribute("aria-labelledby", abas[i].id);
        painel.tabIndex = 0;
      } else {
        painel.removeAttribute("role");
        painel.removeAttribute("aria-labelledby");
        painel.removeAttribute("tabindex");
        painel.hidden = false;
      }
    });

    if (usarAbas) selecionar(atual, false);
  };

  lista.addEventListener("click", (evento) => {
    const aba = evento.target.closest(".pares__aba");
    if (aba) selecionar(abas.indexOf(aba), false);
  });

  lista.addEventListener("keydown", (evento) => {
    const ultimo = abas.length - 1;
    const destinos = {
      ArrowDown: atual === ultimo ? 0 : atual + 1,
      ArrowUp: atual === 0 ? ultimo : atual - 1,
      Home: 0,
      End: ultimo,
    };
    if (evento.key in destinos) {
      evento.preventDefault();
      selecionar(destinos[evento.key], true);
    }
  });

  telaLarga.addEventListener("change", aplicar);
  aplicar();
}

iniciarMenu();
iniciarPares();