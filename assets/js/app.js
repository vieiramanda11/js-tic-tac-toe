const Player = (name, token) => {
  const  getPlayerName = () => name;
  const getPlayerToken = () => token;

  return { getPlayerName, getPlayerToken };
};
