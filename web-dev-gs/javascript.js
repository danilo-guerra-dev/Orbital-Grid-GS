
const dadosSlideshow = [
  {
    imagem: "https://images.openai.com/static-rsc-4/UFal7H15wFgHrwPsemb8T58TOX7dM-Lw6YJAuqvD5fI1KwnWyj8I_BOVRcWgB8TjDLIjd52ahwA-Yx_nJ8PBjVcBWmQxiPWQSOnZc16PpAw1cL2yYfO9p5U5XtNWs3k66tCnKuHbrldewad3i0hebUpwmFT8tKKKvAij_HeIjdU?purpose=inline",
    titulo: "Estação Espacial Internacional",
    descricao: "A ISS opera com painéis solares de 2.500 m² que geram até 120 kW — energia suficiente para abastecer mais de 40 residências.",
  },
  {
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/1280px-Above_Gotham.jpg",
    titulo: "Monitoramento Urbano por Satélite",
    descricao: "Satélites de observação identificam desperdícios energéticos em centros urbanos com precisão de metros.",
  },
  {
    imagem: "https://www.aper.net.br/images/2022/03/16/solar%201.jpg",
    titulo: "Energia Solar Distribuída",
    descricao: "Inspirado na tecnologia espacial, o OrbitalGrid aplica algoritmos de redistribuição de energia para eliminar desperdícios na rede urbana.",
  },
];


let slideAtual = 0;

let timerSlideshow = null;


function montarSlideshow() {
  const area = document.getElementById("area-slideshow");
  if (!area) return;

  area.innerHTML = `
    <div class="trilha-slides" id="trilha-slides"></div>
    <div class="painel-slide">
      <div class="texto-slide" id="texto-slide"></div>
      <div class="controles-slideshow">
        <button class="botao-seta" id="botao-anterior" aria-label="Slide anterior">&#8592;</button>
        <div class="grupo-bolinhas" id="grupo-bolinhas"></div>
        <button class="botao-seta" id="botao-proximo" aria-label="Próximo slide">&#8594;</button>
      </div>
    </div>
  `;

  const trilha = document.getElementById("trilha-slides");
  const grupoBolinhas = document.getElementById("grupo-bolinhas");


  dadosSlideshow.forEach(function (slide, indice) {


    const divSlide = document.createElement("div");
    divSlide.className = "slide" + (indice === 0 ? " slide-ativo" : "");
    divSlide.innerHTML = `
      <img src="${slide.imagem}"
           onerror="this.src='${slide.substituta}'"
           alt="${slide.titulo}"
           loading="lazy" />
      <div class="sombra-slide"></div>
    `;
    trilha.appendChild(divSlide);


    const bolinha = document.createElement("button");
    bolinha.className = "bolinha" + (indice === 0 ? " bolinha-ativa" : "");
    bolinha.setAttribute("aria-label", "Ir para slide " + (indice + 1));
    bolinha.addEventListener("click", function () {
      irParaSlide(indice);
    });
    grupoBolinhas.appendChild(bolinha);
  });


  document.getElementById("botao-anterior").addEventListener("click", slideAnterior);
  document.getElementById("botao-proximo").addEventListener("click", proximoSlide);

  atualizarTextoSlide();
  iniciarTimerSlideshow();
}


function irParaSlide(indice) {
  const slides = document.querySelectorAll(".slide");
  const bolinhas = document.querySelectorAll(".bolinha");


  slides[slideAtual].classList.remove("slide-ativo");
  bolinhas[slideAtual].classList.remove("bolinha-ativa");

  slideAtual = (indice + dadosSlideshow.length) % dadosSlideshow.length;


  slides[slideAtual].classList.add("slide-ativo");
  bolinhas[slideAtual].classList.add("bolinha-ativa");

  atualizarTextoSlide();
  reiniciarTimerSlideshow();
}

function proximoSlide() { irParaSlide(slideAtual + 1); }
function slideAnterior() { irParaSlide(slideAtual - 1); }


function atualizarTextoSlide() {
  const caixa = document.getElementById("texto-slide");
  if (!caixa) return;
  const slide = dadosSlideshow[slideAtual];
  caixa.innerHTML = `<h3>${slide.titulo}</h3><p>${slide.descricao}</p>`;
}


function iniciarTimerSlideshow() {
  timerSlideshow = setInterval(proximoSlide, 5000);
}


function reiniciarTimerSlideshow() {
  clearInterval(timerSlideshow);
  iniciarTimerSlideshow();
}


const perguntasQuiz = [
  {
    pergunta: "Quanto da energia solar gerada pelos painéis da ISS é convertida em eletricidade utilizável?",
    opcoes: ["Cerca de 30%", "Cerca de 50%", "Cerca de 90%", "100%"],
    respostaCorreta: 2,
    explicacao: "Os painéis solares modernos da ISS convertem cerca de 90% da energia solar em eletricidade.",
  },
  {
    pergunta: "O que é um satélite geoestacionário?",
    opcoes: [
      "Satélite que orbita a lua",
      "Satélite que orbita na mesma velocidade de rotação da Terra, parecendo fixo no céu",
      "Satélite movido por energia nuclear",
      "Satélite que monitora terremotos",
    ],
    respostaCorreta: 1,
    explicacao: "Satélites geoestacionários orbitam a ~36.000 km, sincronizados com a rotação terrestre.",
  },
  {
    pergunta: "Qual tecnologia espacial inspirou as redes inteligentes de energia (smart grids) na Terra?",
    opcoes: [
      "Propulsão iônica",
      "Gerenciamento autônomo de energia da ISS",
      "Módulos de reentrada atmosférica",
      "Telescópios de infravermelho",
    ],
    respostaCorreta: 1,
    explicacao: "O gerenciamento autônomo de energia da ISS é referência para smart grids urbanas.",
  },
  {
    pergunta: "O que significa 'albedo' no contexto de energia solar?",
    opcoes: [
      "Velocidade orbital de um satélite",
      "Frequência de ondas de rádio",
      "Fração de luz solar refletida por uma superfície",
      "Tipo de painel solar ultrafino",
    ],
    respostaCorreta: 2,
    explicacao: "Albedo é a medida de reflexão da luz solar por uma superfície, essencial para cálculos de energia.",
  },
  {
    pergunta: "O que melhor representa 'distribuição inteligente de energia'?",
    opcoes: [
      "Aumentar a produção em usinas nucleares",
      "Usar IA para equilibrar oferta e demanda em tempo real",
      "Eliminar o uso de energia elétrica",
      "Construir mais linhas de transmissão",
    ],
    respostaCorreta: 1,
    explicacao: "Smart grids usam IA para equilibrar produção e consumo energético continuamente.",
  },
  {
    pergunta: "Como satélites ajudam no monitoramento energético de cidades?",
    opcoes: [
      "Geram energia e transmitem diretamente para cidades",
      "Detectam padrões de calor e desperdício com sensores infravermelhos",
      "Substituem torres de transmissão",
      "Armazenam energia para apagões",
    ],
    respostaCorreta: 1,
    explicacao: "Sensores infravermelhos em satélites mapeiam perda de calor e desperdício energético urbano.",
  },
  {
    pergunta: "O OrbitalGrid se inspira em qual característica das missões espaciais?",
    opcoes: [
      "Velocidade de deslocamento",
      "Operação autônoma com detecção automática de falhas",
      "Tamanho dos foguetes",
      "Comunicação via rádio AM",
    ],
    respostaCorreta: 1,
    explicacao: "Missões espaciais operam autonomamente, detectando e corrigindo falhas sem intervenção humana.",
  },
  {
    pergunta: "O que é 'space solar power harvesting'?",
    opcoes: [
      "Destruição de satélites obsoletos",
      "Coletar energia solar no espaço e transmiti-la à Terra via micro-ondas",
      "Armazenamento de lixo espacial",
      "Reabastecimento de foguetes em órbita",
    ],
    respostaCorreta: 1,
    explicacao: "O conceito propõe coletar energia solar no espaço e enviá-la à Terra por micro-ondas.",
  },
  {
    pergunta: "Qual é o principal problema que o OrbitalGrid busca resolver?",
    opcoes: [
      "Falta de chuva nas cidades",
      "Desperdício, falhas de distribuição e falta de monitoramento inteligente",
      "Excesso de energia renovável",
      "Alto custo de painéis solares residenciais",
    ],
    respostaCorreta: 1,
    explicacao: "O OrbitalGrid combate os três pilares: desperdício, falhas de distribuição e monitoramento.",
  },
  {
    pergunta: "Qual tecnologia de IA é mais usada em sistemas de monitoramento energético?",
    opcoes: [
      "Processamento de linguagem natural (PLN)",
      "Geração de imagens por difusão",
      "Aprendizado de máquina para detecção de anomalias",
      "Reconhecimento facial",
    ],
    respostaCorreta: 2,
    explicacao: "Algoritmos de detecção de anomalias identificam falhas e padrões de desperdício automaticamente.",
  },
];


let numeroPerguntaAtual = 0;
let pontuacaoQuiz = 0;
let perguntaRespondida = false;


function montarQuiz() {
  const area = document.getElementById("area-quiz");
  if (!area) return;

  area.innerHTML = `
    <div class="cabecalho-quiz">
      <div class="barra-progresso">
        <div class="preenchimento-progresso" id="preenchimento-progresso"></div>
      </div>
      <span class="contador-pergunta" id="contador-pergunta">Pergunta 1 / 10</span>
    </div>
    <div class="corpo-quiz" id="corpo-quiz"></div>
    <div class="cartao-resultado escondido" id="cartao-resultado"></div>
  `;

  mostrarPergunta();
}


function mostrarPergunta() {
  if (numeroPerguntaAtual >= perguntasQuiz.length) {
    mostrarResultadoFinal();
    return;
  }

  const dadosPergunta = perguntasQuiz[numeroPerguntaAtual];
  const corpQuiz = document.getElementById("corpo-quiz");
  const contador = document.getElementById("contador-pergunta");
  const barraPreenchida = document.getElementById("preenchimento-progresso");

  perguntaRespondida = false;


  contador.textContent = "Pergunta " + (numeroPerguntaAtual + 1) + " / " + perguntasQuiz.length;
  barraPreenchida.style.width = (numeroPerguntaAtual / perguntasQuiz.length * 100) + "%";


  corpQuiz.innerHTML = `
    <div class="caixa-pergunta">
      <p class="numero-pergunta">Q${numeroPerguntaAtual + 1}</p>
      <h3>${dadosPergunta.pergunta}</h3>
    </div>
    <div class="lista-opcoes" id="lista-opcoes">
      ${dadosPergunta.opcoes.map(function (opcao, i) {
    return `<button class="botao-opcao" data-indice="${i}">${opcao}</button>`;
  }).join("")}
    </div>
    <div class="caixa-feedback escondido" id="caixa-feedback"></div>
    <button class="botao-proxima escondido" id="botao-proxima">
      ${numeroPerguntaAtual + 1 === perguntasQuiz.length ? "Ver Resultado →" : "Próxima →"}
    </button>
  `;


  document.querySelectorAll(".botao-opcao").forEach(function (botao) {
    botao.addEventListener("click", verificarResposta);
  });
}


function verificarResposta(evento) {

  if (perguntaRespondida) return;
  perguntaRespondida = true;

  const indiceEscolhido = parseInt(evento.currentTarget.dataset.indice);
  const indiceCorreto = perguntasQuiz[numeroPerguntaAtual].respostaCorreta;
  const explicacao = perguntasQuiz[numeroPerguntaAtual].explicacao;
  const todasOpcoes = document.querySelectorAll(".botao-opcao");
  const caixaFeedback = document.getElementById("caixa-feedback");
  const botaoProxima = document.getElementById("botao-proxima");


  todasOpcoes.forEach(function (botao, i) {
    botao.disabled = true;
    if (i === indiceCorreto) botao.classList.add("resposta-certa");
    else if (i === indiceEscolhido) botao.classList.add("resposta-errada");
  });


  if (indiceEscolhido === indiceCorreto) {
    pontuacaoQuiz++;
    caixaFeedback.className = "caixa-feedback feedback-acerto";
    caixaFeedback.innerHTML = "✅ Correto! " + explicacao;
  } else {
    caixaFeedback.className = "caixa-feedback feedback-erro";
    caixaFeedback.innerHTML = "❌ Incorreto. " + explicacao;
  }


  botaoProxima.classList.remove("escondido");
  botaoProxima.addEventListener("click", function () {
    numeroPerguntaAtual++;
    mostrarPergunta();
  });
}


function mostrarResultadoFinal() {
  const corpoQuiz = document.getElementById("corpo-quiz");
  const cartaoResultado = document.getElementById("cartao-resultado");
  const barraPreenchida = document.getElementById("preenchimento-progresso");


  barraPreenchida.style.width = "100%";

  corpoQuiz.classList.add("escondido");
  cartaoResultado.classList.remove("escondido");

  const porcentagem = Math.round((pontuacaoQuiz / perguntasQuiz.length) * 100);


  let medalha = "🥉";
  let mensagem = "Continue estudando sobre energia espacial!";
  if (porcentagem >= 90) { medalha = "🏆"; mensagem = "Excelente! Você é um especialista OrbitalGrid!"; }
  else if (porcentagem >= 70) { medalha = "🥇"; mensagem = "Ótimo desempenho! Quase lá!"; }
  else if (porcentagem >= 50) { medalha = "🥈"; mensagem = "Bom esforço! Continue aprendendo!"; }

  cartaoResultado.innerHTML = `
    <div class="icone-medalha">${medalha}</div>
    <h2>Resultado Final</h2>
    <div class="placar-final">
      <span class="numero-acertos">${pontuacaoQuiz}</span>
      <span class="total-perguntas">/ ${perguntasQuiz.length}</span>
    </div>
    <div class="porcentagem-acertos">${porcentagem}% de acertos</div>
    <p class="mensagem-resultado">${mensagem}</p>
    <button class="botao-tentar-novamente" id="botao-tentar-novamente">🔄 Tentar Novamente</button>
  `;

  document.getElementById("botao-tentar-novamente").addEventListener("click", function () {
    numeroPerguntaAtual = 0;
    pontuacaoQuiz = 0;
    corpoQuiz.classList.remove("escondido");
    cartaoResultado.classList.add("escondido");
    mostrarPergunta();
  });
}



function iniciarValidacaoFormularios() {
  document.querySelectorAll("form[data-validar]").forEach(function (formulario) {
    formulario.addEventListener("submit", enviarFormulario);


    formulario.querySelectorAll("input, textarea, select").forEach(function (campo) {
      campo.addEventListener("input", function () { validarCampo(campo); });
      campo.addEventListener("blur", function () { validarCampo(campo); });
    });
  });
}


function validarCampo(campo) {
  const valor = campo.value.trim();
  let erro = "";


  if (campo.required && !valor) {
    erro = "Este campo é obrigatório.";
  }

  else if (campo.type === "email" && valor) {
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoEmail.test(valor)) erro = "E-mail inválido.";
  }

  else if (campo.minLength && valor.length < campo.minLength && valor) {
    erro = "Mínimo de " + campo.minLength + " caracteres.";
  }

  mostrarErro(campo, erro);
  return !erro;
}


function mostrarErro(campo, mensagem) {

  let elementoErro = campo.parentElement.querySelector(".mensagem-erro");
  if (!elementoErro) {
    elementoErro = document.createElement("span");
    elementoErro.className = "mensagem-erro";
    campo.parentElement.appendChild(elementoErro);
  }

  if (mensagem) {
    campo.classList.add("campo-invalido");
    campo.classList.remove("campo-valido");
    elementoErro.textContent = mensagem;
    elementoErro.style.display = "block";
  } else {
    campo.classList.remove("campo-invalido");
    if (campo.value.trim()) campo.classList.add("campo-valido");
    elementoErro.textContent = "";
    elementoErro.style.display = "none";
  }
}


function enviarFormulario(evento) {
  evento.preventDefault();

  const formulario = evento.target;
  const campos = formulario.querySelectorAll("input, textarea, select");
  let tudoValido = true;


  campos.forEach(function (campo) {
    if (!validarCampo(campo)) tudoValido = false;
  });

  if (tudoValido) {
    mostrarSucesso(formulario);
  } else {

    const primeiroCampoInvalido = formulario.querySelector(".campo-invalido");
    if (primeiroCampoInvalido) primeiroCampoInvalido.focus();
  }
}


function mostrarSucesso(formulario) {
  const avisoSucesso = document.createElement("div");
  avisoSucesso.className = "aviso-sucesso";
  avisoSucesso.innerHTML = `
    <span class="icone-sucesso">✅</span>
    <p>Mensagem enviada com sucesso! Em breve entraremos em contato.</p>
  `;
  formulario.innerHTML = "";
  formulario.appendChild(avisoSucesso);
}



const temas = {
  "espaco-escuro": {
    rotulo: " Espaço Escuro",
    "--cor-fundo-principal": "#0a0a0f",
    "--cor-fundo-secundario": "#12121a",
    "--cor-fundo-cartao": "#1a1a2e",
    "--cor-texto-principal": "#e8e8f0",
    "--cor-texto-secundario": "#9090a8",
    "--cor-destaque": "#7b61ff",
    "--cor-brilho-destaque": "rgba(123, 97, 255, 0.3)",
    "--cor-borda": "rgba(123, 97, 255, 0.2)",
    "--cor-fundo-menu": "rgba(10, 10, 15, 0.95)",
  },
  "azul-nasa": {
    rotulo: " Azul NASA",
    "--cor-fundo-principal": "#0b1e3d",
    "--cor-fundo-secundario": "#0d2347",
    "--cor-fundo-cartao": "#102a55",
    "--cor-texto-principal": "#ddeeff",
    "--cor-texto-secundario": "#7ab3e0",
    "--cor-destaque": "#00b4d8",
    "--cor-brilho-destaque": "rgba(0, 180, 216, 0.3)",
    "--cor-borda": "rgba(0, 180, 216, 0.25)",
    "--cor-fundo-menu": "rgba(11, 30, 61, 0.97)",
  },
  "luz-solar": {
    rotulo: " Luz Solar",
    "--cor-fundo-principal": "#f5f0e8",
    "--cor-fundo-secundario": "#ede7d9",
    "--cor-fundo-cartao": "#ffffff",
    "--cor-texto-principal": "#1a1a2e",
    "--cor-texto-secundario": "#4a4a6a",
    "--cor-destaque": "#e67e22",
    "--cor-brilho-destaque": "rgba(230, 126, 34, 0.2)",
    "--cor-borda": "rgba(230, 126, 34, 0.3)",
    "--cor-fundo-menu": "rgba(245, 240, 232, 0.97)",
  },
};


let temaAtivo = "espaco-escuro";

function montarSeletorTema() {
  const seletor = document.getElementById("seletor-tema");
  if (!seletor) return;

  Object.entries(temas).forEach(function ([chave, tema]) {
    const botao = document.createElement("button");
    botao.className = "botao-tema" + (chave === temaAtivo ? " tema-ativo" : "");
    botao.textContent = tema.rotulo;
    botao.dataset.tema = chave;
    botao.addEventListener("click", function () { aplicarTema(chave); });
    seletor.appendChild(botao);
  });


  aplicarTema(temaAtivo);
}


function aplicarTema(chaveTema) {
  const tema = temas[chaveTema];
  if (!tema) return;

  const raiz = document.documentElement;


  Object.entries(tema).forEach(function ([propriedade, valor]) {
    if (propriedade !== "rotulo") {
      raiz.style.setProperty(propriedade, valor);
    }
  });

  document.querySelectorAll(".botao-tema").forEach(function (botao) {
    botao.classList.toggle("tema-ativo", botao.dataset.tema === chaveTema);
  });

  temaAtivo = chaveTema;


  try { localStorage.setItem("orbitalgrid-tema", chaveTema); } catch (_) { }
}


function carregarTemaSalvo() {
  try {
    const temaSalvo = localStorage.getItem("orbitalgrid-tema");
    if (temaSalvo && temas[temaSalvo]) temaAtivo = temaSalvo;
  } catch (_) { }
}




function iniciarMenuResponsivo() {
  const botaoHamburguer = document.getElementById("botao-hamburguer");
  const listaMenu = document.getElementById("lista-menu");
  if (!botaoHamburguer || !listaMenu) return;


  botaoHamburguer.addEventListener("click", function () {
    const estaAberto = listaMenu.classList.toggle("menu-aberto");
    botaoHamburguer.setAttribute("aria-expanded", estaAberto);
    botaoHamburguer.classList.toggle("aberto", estaAberto);
  });


  listaMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", fecharMenu);
  });


  document.addEventListener("click", function (evento) {
    const clicouFora = !botaoHamburguer.contains(evento.target) && !listaMenu.contains(evento.target);
    if (clicouFora) fecharMenu();
  });
}

function fecharMenu() {
  const botaoHamburguer = document.getElementById("botao-hamburguer");
  const listaMenu = document.getElementById("lista-menu");
  if (!listaMenu) return;
  listaMenu.classList.remove("menu-aberto");
  botaoHamburguer.classList.remove("aberto");
  botaoHamburguer.setAttribute("aria-expanded", false);
}





function iniciarAnimacaoAoRolar() {
  const observador = new IntersectionObserver(
    function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {

          entrada.target.classList.add("visivel");

          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.1 }
  );


  document.querySelectorAll(".aparece-ao-rolar").forEach(function (elemento) {
    observador.observe(elemento);
  });
}




function iniciarEfeitoMenuRolar() {
  const menu = document.getElementById("menu-navegacao");
  if (!menu) return;

  window.addEventListener("scroll", function () {
    // Adiciona sombra quando a página rolar mais de 50px
    menu.classList.toggle("menu-com-sombra", window.scrollY > 50);
  });
}



document.addEventListener("DOMContentLoaded", function () {
  carregarTemaSalvo();
  montarSeletorTema();
  montarSlideshow();
  montarQuiz();
  iniciarValidacaoFormularios();
  iniciarMenuResponsivo();
  iniciarAnimacaoAoRolar();
  iniciarEfeitoMenuRolar(); u
});