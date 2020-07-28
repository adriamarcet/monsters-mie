(function(){
	"use strict";
	/** Declarations */
	const app = document.getElementById('app');
    const door = 'https://www.svgrepo.com/show/84749/closed-filled-rectangular-door.svg';
    var alert = document.createElement('p'); // is a node
    alert.setAttribute('role', 'alert');
    alert.innerHTML = 'You have hit the sock';

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

    var displayShuffledMonsters = function() {
        const shuffledMonsters = shuffle(monsters.slice());

        shuffledMonsters.forEach(function (shuffledMonster) {
            var gridWrapper = document.createElement('div');
            gridWrapper.classList.add('grid');

            var button = document.createElement('button');
            button.classList.add('js-monster-door');
            button.style.backgroundImage = '';
            button.setAttribute('aria-live', 'polite');
            button.textContent = 'Knock at the door';

            gridWrapper.appendChild(button);

            monstersGrid.push(gridWrapper);
        });

        console.log(monstersGrid);

        var row = document.createElement('div');
        row.classList.add('row');
        row.appendChild(monstersGrid.join());

        app.appendChild(row);
    }

	var startGame = () => {
        displayShuffledMonsters();
        monsterDoors = document.querySelectorAll('.js-monster-door');
	};

    startGame();

    /** Listeners */
	monsterDoors.forEach(monsterDoor => {
		monsterDoor.addEventListener('click', () => {
            var monsterInside = monsterDoor.getAttribute('data-monster');

            if (monsterInside == 'sock') {
                app.insertBefore(alert, app.firstElementChild.nextSibling);
                startGame();
                return;
			}

			monsterDoor.style.background = '';
            monsterDoor.textContent = monsterInside;
		});
	});
})();
