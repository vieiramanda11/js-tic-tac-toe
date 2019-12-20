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
  const firstPlayer, secondPlayer;

  const setGame = (player) => {
    turnX = 'X';
    turnO = 'O';
    endRound = false;
    currentPlayer = player;
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
  };

  const winVerticalCondition = () => {
    if (board[0] == board[3] && board[0] == board[6] ||
        board[1] == board[4] && board[1] == board[7] ||
        board[2] == board[5] && board[2] == board[8]) {
          return true;
       }
  };

  const winDiagonalCondition = () => {
    if (board[0] == board[4] && board[0] == board[8] ||
        board[2] == board[4] && board[2] == board[6]) {
          return true;
        }
  };

  const players = (first, second) => {
    firstPlayer = Player(first, turnX);
    secondPlayer = Player(second, turnO);
  }

  return {
    setGame, getCurrentPlayer
  }

})();

playerX = Player('amanda', 'X');
gameBoard.setGame(playerX);
console.log('Hey..',gameBoard.getCurrentPlayer().getPlayerName());
