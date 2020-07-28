(function(){
	"use strict";
	/** Declarations */
	const app = document.getElementById('app');
	const door = 'https://www.svgrepo.com/show/84749/closed-filled-rectangular-door.svg';
	var monsterDoors = [];
	// The monsters and socks
	const monsters = [
		'monster1',
		'monster2',
		'monster3',
		'monster4',
		'monster5',
		'monster6',
		'monster7',
		'monster8',
		'monster9',
		'monster10',
		'monster11',
		'sock'
	];

	/** Functions */
	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	};

	var startGame = () => {
		const shuffledMonsters = shuffle(monsters.slice());
		const monstersGrid = shuffledMonsters.map(monster => {
			return `<div class="grid"><button class="js-monster-door" style="background-image: url('${door}');"><span class="js-monster" data-monster="${monster}" aria-live></span></button></div>`;
		}).join('');

        app.innerHTML = `<div class="row">${monstersGrid}</div>`;
        monsterDoors = document.querySelectorAll('.js-monster-door');
	};

    startGame();

    /** Listeners */
	monsterDoors.forEach(monsterDoor => {
		monsterDoor.addEventListener('click', () => {
			var monsterInside = monsterDoor.querySelector('.js-monster');
			var monsterInsideText = monsterInside.getAttribute('data-monster');

			if(monsterInsideText == 'sock') {
				alert('you hit the sock')
				startGame();
			}

			monsterDoor.style.background = '';
			monsterInside.textContent = monsterInsideText;
		});
	});
})();
