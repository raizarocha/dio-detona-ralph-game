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
		hitPosition: 0,
		result: 0,
		currentTime: 60,
	},
	actions: {
		timerId: setInterval(randomSquare, 1000),
		countDownTimerId: setInterval(countDown, 1000),
	}
};

// função que decrementa o tempo
function countDown() {
	// sempre que for chamada o tempo vai diminuir;
	state.values.currentTime--;

	// atualiza o valor visualmente
	state.view.timeLeft.textContent = state.values.currentTime;

	// confere se o tempo é menor ou igual a 0
	if (state.values.currentTime <= 0) {
		// e dispara o resultado
		alert("Game over! O seu resultado foi: " + state.values.result);
	}
}

// função que reproduz o audio especificado no parâmetro
function playSound(audioName) {
	let audio = new Audio(`./src/audios/${audioName}.m4a`);
	audio.volume = 0.2;
	audio.play();
}

// função que sorteia um quadrado aleatório e seleciona um inimigo
function randomSquare() {
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
	// guarda o id do quadrado aleatório sorteado
	state.values.hitPosition = randomSquare.id;
}


/// REFATORADA PARA ACTIONS ///
// função que move o inimigo e guarda o valor no timerId
// function moveEnemy() {
// 	cria intervalo (a cada x (1000 - ms) tempo ele chama a função randomSquare para adicionar o inimigo em um quadrado temporário)
// 	state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
// }


// função que espera (ouve) uma ação, para ser executada
function addListenerHitbox() {
	// para cada evento ele executa uma ação
	state.view.squares.forEach((square) => {
		// evento de click
		square.addEventListener("mousedown", () => {
			// confere se o quadrado clicado é igual ao quadrado que está o inimigo
			if(square.id === state.values.hitPosition) {
				// se for igual, adiciona +1 ao resultado
				state.values.result++;
				// modifica visualmente o score
				state.view.score.textContent = state.values.result;
				// garante que o usuário não continue clicando no mesmo lugar e farme pontos infinitos
				state.values.hitPosition = null;
				// sempre que adicionar pontuação, reproduz o audio
				playSound("src_audios_hit");
			};
		});
	});
}

// função principal que chama as funções iniciais
function init() {
	// moveEnemy();
	addListenerHitbox();
}

// executa o que está dentro do escopo da função init
init();