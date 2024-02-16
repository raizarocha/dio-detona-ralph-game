const state = {
  view: {
		squares: document.querySelectorAll(".square"),
		enemy: document.querySelector(".enemy"),
		timeLeft: document.querySelector("#time-left"),
		score: document.querySelector("#score"),
	},
	values: {
		timerId: null,
		gameVelocity: 1000,
	},
};


// função que sorteia um quadrado aleatório e seleciona um inimigo
function randomSquare(){
	// percorre todos os quadrados e remove a classe enemy
	state.view.squares.forEach((square) => {
		square.classList.remove("enemy");
	});
	// sorteia número aleatório de 1 a 9
	let randomNumber = Math.floor(Math.random() * 9);
	// pega quadrado aleatório que a função randomNumber sortear
	let randomSquare = state.view.squares[randomNumber];
	// adiciona a classe enemy no quadrado selecionado pela função randomSquare
	randomSquare.classList.add("enemy");
}

// função que move o inimigo e guarda o valor no timerId
function moveEnemy(){
	// cria intervalo (a cada x (1000 - ms) tempo ele chama a função randomSquare para adicionar o inimigo em um quadrado temporário)
	state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

// função que espera (ouve) uma ação, para ser executada
function addListenerHitbox(){
	state.view.squares.forEach((square) => {});
}

// função principal que chama as funções iniciais
function init() {
	moveEnemy();
}

// executa o que está dentro do escopo da função init
init();