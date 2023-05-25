
/*Výběr prvků z HTML*/
let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

/*Získání hodnoty barvy výherních polí z CSS */
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

/*Konstanty a proměnné*/

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

/*Na každé políčko přidána kontrola kliknutí; po kliknutí na políčko zavolána funkce boxClicked*/
	const startGame = () => {
		boxes.forEach(box => box.addEventListener('click', boxClicked))
	}

function boxClicked(e){
	
	/*Identifikace konkrétního kliknutého políčka */
	const id = e.target.id
	/*Zjišťujde, zda-li je políčko prázdné */
	if(!spaces[id]){
		spaces[id] = currentPlayer
		e.target.innerText = currentPlayer
		/*Vypíše, kdo vyhrál*/
		if(playerHasWon())	{
			playerText.innerHTML = `${currentPlayer} vyhrál!`
			let winning_blocks = playerHasWon()
		/*Zvýraznění vítězných políček */		
			playerHasWon().map(box => boxes[box].style.backgroundColor = winnerIndicator)
		}
		/*Přepínání tahů mezi hráči*/
		currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
	}
}
/*Vítězné kombinace*/
const winningCombos = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6]
	
]
/*Kontrola, zda hráč vyhrál hru*/	
function playerHasWon(){
	for (const condition of winningCombos) {
		let [a, b, c] = condition
		
		/*Kontrola vystihnutí vítězné kombinace*/	
		if(spaces[a] && (spaces[a] == spaces [b] && spaces[a] == spaces [c])) {
			return [a, b, c]
		}
	}
/*Vrácení false pokud, nikdo nevyhrál*/
return false
}

restartBtn.addEventListener('click', restart)

/*Restart hry */
function restart(){
	spaces.fill(null)		/*Vymazání všech tahů z polí */
	
	boxes.forEach( box => { /*Maže text a barevné pozadí */
		box.innerText = ''
		box.style.backgroundColor = ''
	})
	
	playerText.innerText = 'Piškvorky' /*Nahrazení věty "x/o vyhrál" textem "Piškvorky" */
	
	currentPlayer = X_TEXT /*První kliknutí bude X */
}
/*zahájení hry */
startGame()