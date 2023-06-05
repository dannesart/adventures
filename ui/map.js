class Map {
  __gameBoard;
  __mapSize;

  __build = () => {
    this.__mapSize = {
      h: this.__gameBoard.offsetHeight,
      w: this.__gameBoard.offsetWidth,
    };
  };

  __getMap = () => {
    return this.__gameBoard;
  };

  __clear = () => {
    this.__getMap().innerHTML = "";
  };

  randomPosition = () => {
    return {
      y: Math.floor(Math.random() * this.__mapSize.h) + 1,
      x: Math.floor(Math.random() * this.__mapSize.w) + 1,
    };
  };

  getSize = () => this.__mapSize;

  placeUnit = (unit) => {
    const map = this.__getMap();
    map.appendChild(unit);
  };

  constructor(gameBoard) {
    this.__gameBoard = gameBoard;
    this.__build();
    this.__clear();
  }
}

export { Map };
