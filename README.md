# 🌅 Coema · Site do Projeto

<div align="center">

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white)](https://nandaromao.github.io/coema-site/)

*Coema. Em tupi: já é dia.*

**[Ver o site no ar →](https://nandaromao.github.io/coema-site/)**

</div>

## 📋 Sobre o Projeto

O **Coema** é um projeto acadêmico de acompanhamento contínuo para quem vive com doenças crônicas autoimunes, tendo o lúpus (LES) como caso de referência. A proposta é cuidar do intervalo entre uma consulta e outra: lembretes, check-in diário, triagem em três níveis e um histórico que acompanha o paciente em qualquer atendimento.

Este repositório guarda o **site de apresentação** do projeto: o problema, a solução, o papel da IA, a triagem, a segurança, o estágio atual, a equipe e o diário de bordo. É um site estático, escrito à mão em HTML, CSS e JavaScript puros, sem frameworks, sem dependências e sem serviços de terceiros.

O Coema é desenvolvido por estudantes do **Sistema Ânima de Educação**, no **Ânima Lab HUB**, pela plataforma **Way HUB**.

**Status:** 🚧 Em construção *(atualizado em 15/11/2026)*
**Fase do projeto:** ideação e prototipação. Ainda não há piloto nem pacientes usando.

---

## 🏗️ Estrutura

```
coema-site/
├── index.html              → Página principal
├── bastidores.html         → Equipe e diário de bordo completo
├── css/
│   ├── base.css            → Paleta, fontes, tipografia e variáveis
│   ├── layout.css          → Container, grades e cabeçalho
│   ├── componentes.css     → Botões, cartões, caixas e listas
│   └── secoes.css          → Estilo de cada seção e do rodapé
├── js/
│   ├── main.js             → Ponto de entrada (menu, abas, demo, diário)
│   ├── triagem-demo.js     → Demonstração ilustrativa da triagem
│   └── diario.js           → Leitura e montagem do diário de bordo
├── data/
│   └── diario.json         → Registros do diário de bordo
├── fonts/                  → Fraunces e Nunito Sans, servidas localmente
├── img/                    → Ilustrações, favicon e imagem de prévia
├── video/                  → Filme "Coema: já é dia", pôster e legendas
├── .well-known/
│   └── security.txt        → Contato para relatos de segurança
├── .nojekyll
└── Aviso.md
```

| Camada | Escolha |
|---|---|
| Estrutura | HTML semântico, duas páginas |
| Estilo | CSS puro, organizado em quatro arquivos, com variáveis no `:root` |
| Interação | JavaScript em módulos ES, sem bibliotecas |
| Conteúdo dinâmico | `data/diario.json`, lido pelo próprio site |
| Hospedagem | GitHub Pages |

### 🎨 Identidade visual

A paleta foi extraída das ilustrações da Lia, a personagem que conduz a história do projeto: tons de noite, lavanda, aurora e sol, seguindo o tema do amanhecer. Títulos em **Fraunces**, texto em **Nunito Sans**.

---

## 🔐 Segurança

- **Política de segurança de conteúdo (CSP)** restrita a `'self'`: o site só carrega scripts, estilos, fontes, imagens e vídeo do próprio domínio
- **Nenhum serviço de terceiros:** sem cookies, rastreadores, analytics ou CDN; as fontes são servidas localmente
- **Nenhum envio de dados:** a demonstração da triagem roda inteira no navegador e não guarda nem envia respostas
- O diário trata o `diario.json` como **dado não confiável**: cada registro é validado antes de entrar na página, e todo o conteúdo é inserido com `textContent`, nunca com `innerHTML`
- Links externos abrem com `rel="noopener noreferrer"`
- Arquivo `security.txt` em `.well-known/` para relatos de vulnerabilidade

## ♿ Acessibilidade

- Link "Pular para o conteúdo" e navegação completa por teclado, incluindo as abas e a demonstração
- Contraste de texto dentro do nível AA da WCAG em todas as seções
- Ilustrações com texto alternativo descritivo
- Filme com legendas (`.vtt`) e transcrição completa na página
- Respeito à preferência de **movimento reduzido** do sistema
- Conteúdo essencial disponível mesmo sem JavaScript

---

## 📓 Diário de bordo

O diário é alimentado pelo arquivo `data/diario.json`. Para registrar algo novo, acrescente um objeto no início da lista:

```json
{
  "data": "2026-11-15",
  "titulo": "Título curto do registro",
  "texto": "O que foi feito, em uma ou duas frases.",
  "autor": "Nome de quem fez",
  "tag": "desenvolvimento"
}
```

| Campo | Regra |
|---|---|
| `data` | Formato `AAAA-MM-DD` |
| `titulo` | Até 80 caracteres |
| `texto` | Até 600 caracteres |
| `autor` | Até 60 caracteres |
| `tag` | `pesquisa`, `design`, `desenvolvimento`, `validacao`, `evento` ou `equipe` |
| `link` | Opcional; precisa começar com `https://` |

Registros fora dessas regras são ignorados pelo site. A página principal mostra os três mais recentes; a página Bastidores mostra todos, com filtro por tag.

---

## 📈 Roadmap do Site

### ✅ Concluído
- [x] Abertura com o filme "Coema: já é dia", legendas e transcrição
- [x] Seções O problema, Rotatividade, A solução, Como funciona e A IA
- [x] Triagem em três níveis com demonstração interativa
- [x] Seções Segurança e Estágio
- [x] Diário de bordo alimentado por JSON, com filtros
- [x] Página Bastidores com equipe e diário completo
- [x] Rodapé e imagem de prévia para compartilhamento

### 🚧 Em andamento
- [ ] Perfis dos demais integrantes da equipe
- [ ] Vídeo do pitch hospedado no site, com link para o YouTube
- [x] `Aviso.md` e `security.txt` com o conteúdo final

### 💫 Planejado
- [ ] Novos registros no diário conforme o projeto avança
- [ ] E-mail de contato do projeto

---

## 🌱 Metodologia de Desenvolvimento

O site foi construído parte por parte, com commits pequenos e revisados, cada um representando uma seção ou correção concluída. A cada etapa, a versão publicada foi conferida no navegador em telas de celular e de computador, com atenção a contraste, estrutura do HTML e funcionamento sem erros no console.

**Para recrutadores:** o histórico de commits mostra a construção completa do site, da estrutura inicial às correções finais.

---

## 🛠️ Rodando localmente

Clone o repositório e abra a pasta no VS Code:

```bash
git clone https://github.com/NandaRomao/coema-site.git
cd coema-site
```

Depois, abra o `index.html` com a extensão **Live Server**.

> Os scripts usam módulos ES e o diário lê um arquivo JSON, então o site precisa ser aberto por um servidor local. Abrir o arquivo com duplo clique não carrega a demonstração nem o diário.

---

<div align="center">

## 📞 Contato

<p align="center">
<a href="https://www.linkedin.com/in/romaonanda/" target="_blank">
<img src="https://img.icons8.com/color/48/000000/linkedin.png" width="50" alt="LinkedIn"/>
</a>
<a href="https://github.com/NandaRomao" target="_blank">
<img src="https://img.icons8.com/ios-glyphs/60/FFFFFF/github.png" width="50" alt="GitHub"/>
</a>
</p>

*Projeto acadêmico do Ânima Lab HUB · Sistema Ânima de Educação. Este site tem caráter informativo e não oferece orientação médica.*

▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔

**🌅 Coema. Já é dia. 🌅**

</div>