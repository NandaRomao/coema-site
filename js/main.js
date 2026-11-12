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

iniciarMenu();