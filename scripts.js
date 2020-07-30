(function(){
	"use strict";
	/** Declarations */
	var app = document.getElementById('app');
	var appMessages = document.getElementById('app-messages');
	var restarGameButton = document.querySelector('.js-restart');
	var monsterDoorClass = 'js-monster-door';
	var statusClassRestart = 'status-restart-game';
	var classVisuallyHidden = 'u-sr-only';
	var sourceImages = 'assets/img/';
    var monstersGrid = [];
	var monsterDoors = [];

	var doors = [
		'door1',
		'door2',
		'door3',
		'door4',
		'door5',
		'door6',
		'door7',
		'door8',
		'door9',
	];

    // The monsters and socks
	var monsters = [
		'monster1',
		'monster2',
		'monster3',
		'monster4',
		'monster5',
		'monster6',
		'monster7',
		'monster8',
		'boo'
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

	var shuffleMonsters = function() {
		var shuffledMonsters = shuffle(monsters.slice());
		return shuffledMonsters;
	}

    var displayShuffledMonsters = function() {
		// Reset the grid
		monstersGrid = [];

		var shuffledMonsters = shuffleMonsters();
		var shuffledDoors = shuffle(doors);
		shuffledMonsters.forEach(function (shuffledMonster, index) {
            var gridWrapper = document.createElement('div');
            gridWrapper.classList.add('grid');

			var span = document.createElement('span');
            var button = document.createElement('button');
			button.classList.add(monsterDoorClass);
            button.classList.add('button-door');
			button.style.backgroundImage = 'url(' + sourceImages + shuffledDoors[index] + '.jpg' + ')';
            button.setAttribute('aria-live', 'polite');
            button.setAttribute('data-monster', shuffledMonster);
			span.classList.add(classVisuallyHidden);
			span.textContent = 'Knock at the door';
			button.append(span);

            gridWrapper.appendChild(button);
            monstersGrid.push(gridWrapper);
        });

        var row = document.createElement('div');
        row.classList.add('row');
        monstersGrid.forEach(function(monsterGrid) {
            row.appendChild(monsterGrid);
        });

        return row;
    }

	var startGame = () => {
        app.appendChild(displayShuffledMonsters());

		monsterDoors = document.querySelectorAll('.' + monsterDoorClass);

		/** Listeners */
		monsterDoors.forEach(function (monsterDoor) {
			monsterDoor.addEventListener('click', () => {
				var monsterInside = monsterDoor.getAttribute('data-monster');
				var span = document.createElement('span');
				span.classList.add(classVisuallyHidden);

				monsterDoor.style.backgroundImage = 'url(' + sourceImages + monsterInside + '.png' + ')';
				span.textContent = monsterInside;
				monsterDoor.appendChild(span);

				if (monsterInside == 'boo') {
					appMessages.hidden = false;
					document.documentElement.classList.add(statusClassRestart);
				}
			}, monsterDoors);
		});

		restarGameButton.addEventListener('click', () => {
			appMessages.hidden = true;
			app.innerHTML = '';
			document.documentElement.classList.remove(statusClassRestart);
			startGame();
		});
	};

	startGame();
})();
