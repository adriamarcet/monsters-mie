(function(){
	"use strict";
	/** Declarations */
	const app = document.getElementById('app');
    const door = 'https://www.svgrepo.com/show/84749/closed-filled-rectangular-door.svg';
    var alert = document.createElement('p'); // is a node
    alert.setAttribute('role', 'alert');
    alert.textContent = 'You have hit the sock';

    var monstersGrid = [];
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

	var shuffleMonsters = function() {
		const shuffledMonsters = shuffle(monsters.slice());
		return shuffledMonsters;
	}

    var displayShuffledMonsters = function() {
		// Reset the grid
		monstersGrid = [];

		var shuffled = shuffleMonsters();
		shuffled.forEach(function (shuffledMonster) {
            var gridWrapper = document.createElement('div');
            gridWrapper.classList.add('grid');

            var button = document.createElement('button');
            button.classList.add('js-monster-door');
            button.style.backgroundImage = 'url(' + door + ')';
            button.setAttribute('aria-live', 'polite');
            button.setAttribute('data-monster', shuffledMonster);
            button.textContent = 'Knock at the door';

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

		monsterDoors = document.querySelectorAll('.js-monster-door');

		/** Listeners */
		monsterDoors.forEach(function (monsterDoor) {
			monsterDoor.addEventListener('click', () => {
				var monsterInside = monsterDoor.getAttribute('data-monster');

				if (monsterInside == 'sock') {
					// app.insertBefore(alert, app.firstElementChild.nextSibling);
					app.innerHTML = '';
					startGame();
					// return;
				}

				monsterDoor.style.background = '';
				monsterDoor.textContent = monsterInside;
			}, monsterDoors);
		});
	};

    startGame();
})();
