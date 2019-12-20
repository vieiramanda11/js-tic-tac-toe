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

  return {
    setGame, getCurrentPlayer
  }

})();

playerX = Player('amanda', 'X');
gameBoard.setGame(playerX);
console.log('Hey..',gameBoard.getCurrentPlayer().getPlayerName());
