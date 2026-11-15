// Demonstração ilustrativa da triagem.
// As regras abaixo são FICTÍCIAS e simplificadas. Não são as regras do Coema
// e não servem para avaliar a saúde de ninguém.

const NIVEIS = {
  verde: {
    nome: "Verde · Tudo dentro do esperado",
    texto: "O registro é guardado no histórico. Ninguém é acionado.",
  },
  amarelo: {
    nome: "Amarelo · Atenção",
    texto: "Algo saiu do padrão. O paciente recebe orientação de acompanhar e o caso fica sinalizado para a equipe na próxima revisão.",
  },
  vermelho: {
    nome: "Vermelho · Alerta",
    texto: "Sinal que pede avaliação rápida. A equipe responsável e o contato de confiança são avisados, e o paciente é orientado a procurar atendimento.",
  },
};

function classificar({ estado, medicacao, sinal }) {
  if (sinal === "febre") {
    return { nivel: "vermelho", regra: "febre registrada leva a alerta." };
  }
  if (estado === "mal" && sinal === "dor") {
    return { nivel: "vermelho", regra: "sentir-se mal com dor ou inchaço nas articulações leva a alerta." };
  }
  if (estado === "mal" && sinal === "cansaco") {
    return { nivel: "amarelo", regra: "sentir-se mal com cansaço fora do comum pede atenção." };
  }
  if (estado === "mal") {
    return { nivel: "amarelo", regra: "sentir-se mal, mesmo sem outro sinal, pede atenção." };
  }
  if (sinal !== "nada") {
    return { nivel: "amarelo", regra: "um sinal isolado, diferente de febre, pede atenção." };
  }
  if (medicacao === "nao") {
    return { nivel: "amarelo", regra: "medicação não tomada pede atenção." };
  }
  return { nivel: "verde", regra: "nenhum sinal fora do padrão." };
}

export function iniciarTriagemDemo() {
  const form = document.querySelector("[data-triagem-demo]");
  if (!form) return;

  const saida = form.querySelector("[data-triagem-resultado]");
  const campoNivel = saida.querySelector(".resultado__nivel");
  const campoTexto = saida.querySelector(".resultado__texto");
  const campoRegra = saida.querySelector(".resultado__regra");

  const atualizar = () => {
    const dados = new FormData(form);
    const respostas = {
      estado: dados.get("estado"),
      medicacao: dados.get("medicacao"),
      sinal: dados.get("sinal"),
    };

    if (!respostas.estado || !respostas.medicacao || !respostas.sinal) return;

    const { nivel, regra } = classificar(respostas);
    saida.dataset.nivel = nivel;
    campoNivel.textContent = NIVEIS[nivel].nome;
    campoTexto.textContent = NIVEIS[nivel].texto;
    campoRegra.textContent = `Regra de exemplo: ${regra}`;
  };

  form.addEventListener("change", atualizar);
  form.addEventListener("submit", (evento) => evento.preventDefault());
}