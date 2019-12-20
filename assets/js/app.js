const Player = (name, token) => {
  const  getPlayerName = () => name;
  const getPlayerToken = () => token;

  return { getPlayerName, getPlayerToken };
};

// Module Gameboard
const gameBoard = (() => {

  let board;
  let currentPlayer;
  let turnX;
  let turnO;
  let endRound;
  let firstPlayer;
  let secondPlayer;

  const setGame = () => {
    turnX = 'X';
    turnO = 'O';
    endRound = false;
    board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  const getCurrentPlayer = ()=> {
    return currentPlayer;
  }

  const winHorizontalCondition = () => {
    if (board[0] === board[1] && board[0] === board[2] ||
        board[3] === board[4] && board[3] === board[5] ||
        board[6] === board[7] && board[6] === board[8]) {
          return true;
        }
  }

  const winVerticalCondition = () => {
    if (board[0] == board[3] && board[0] == board[6] ||
        board[1] == board[4] && board[1] == board[7] ||
        board[2] == board[5] && board[2] == board[8]) {
          return true;
       }
  }

  const winDiagonalCondition = () => {
    if (board[0] == board[4] && board[0] == board[8] ||
        board[2] == board[4] && board[2] == board[6]) {
          return true;
        }
  }

  const players = (first, second) => {
    firstPlayer = Player(first, turnX);
    secondPlayer = Player(second, turnO);
    currentPlayer = firstPlayer;
  }

  const changePlayer = () => {
    currentPlayer = currentPlayer === firstPlayer ? secondPlayer : firstPlayer;
    return currentPlayer;
  }

  const playerMove = (position) => {
    console.log('before', currentPlayer.getPlayerName(), firstPlayer.getPlayerName(), secondPlayer.getPlayerName());
    if(endRound ===false){
      if (currentPlayer === firstPlayer) {
        board[position] = firstPlayer.getPlayerToken();
        console.log('after', board);
        endRound = true;

      }else{
        board[position] = secondPlayer.getPlayerToken();
        endRound = true;
      }
    }
    changePlayer();
    endRound = false;
  }

  const draw = () => {
    let filter = board.filter((position) => !Number.isInteger(position));

    if (filter.length === 9) {
      return true;
    } else {
      return false;
    }
  }

  const win = () => {
    if(winDiagonalCondition() || winHorizontalCondition() || winVerticalCondition()) {
      return true;
    } else {
      return false;
    }
  }

  const winner = () => {
    return currentPlayer === firstPlayer ? secondPlayer.getPlayerName() : firstPlayer.getPlayerName();
  }

  const boardEmpty = () => {
    let filter = board.filter((position) => Number.isInteger(position));
    if (filter.length === board.length) {
      return true;
    } else {
      return false;
    }

  }

  return {
    setGame, getCurrentPlayer, players, win, draw, playerMove, winner, boardEmpty
  };

})();

//Module displayController
const displayController = ( () => {
  const renderStartGame = () => {
    console.log('Hey',this);
    const playerXInput = document.querySelector('#name-player-x');
    const playerOInput = document.querySelector('#name-player-o');
    const alert = document.querySelector('#names-players');
    alert.classList.remove('d-none');
    if (playerXInput.value !== '' && playerOInput.value !== '') {
      alert.classList.add('d-none');
      renderBoard(playerXInput.value, playerOInput.value)
    }

  }

  const renderBoard = (nameX, nameO) => {
    const form = document.querySelector('.form');
    const boardGame = document.querySelector('#board-game');
    boardGame.classList.remove('board-hidden');
    boardGame.classList.add('board-active');
    form.classList.toggle('form-hidden');
    gameBoard.setGame();
    gameBoard.players(nameX, nameO);

  }

  const renderMoves = (e) =>{


    if (gameBoard.boardEmpty()){
      e.target.innerHTML = gameBoard.getCurrentPlayer().getPlayerToken() === 'X' ? 'O':'X';
      gameBoard.playerMove(e.target.dataset.position-1);
    }

    if (!gameBoard.win() && !gameBoard.draw() ) {
      e.target.innerHTML = gameBoard.getCurrentPlayer().getPlayerToken() === 'X' ? 'O':'X';
      gameBoard.playerMove(e.target.dataset.position-1);
    }

    if (gameBoard.win()){
      renderMessages(`${gameBoard.winner()} congratulations, you won the game!`);
    }else if(gameBoard.draw()) {
      renderMessages("Too bad. It's a draw.");
    }

  }

  const renderMessages = (messageString) => {
    const spanMessage = document.querySelector('.span-message');
    spanMessage.innerHTML = messageString;
  }

  return {
    renderStartGame, renderMoves
  }

}

)();

const buttonStartGame = document.querySelector('#start-game');
const buttonsMove = document.querySelectorAll('.btn-move');
buttonStartGame.addEventListener('click',displayController.renderStartGame);
buttonsMove.forEach((button) => button.addEventListener('click', displayController.renderMoves));
