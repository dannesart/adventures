class Map {
  __mapID = "game";
  __mapSize;
  __mapElement;

  __build = () => {
    this.__mapElement = document.getElementById(this.__mapID);
    this.__mapSize = {
      h: this.__mapElement.offsetHeight,
      w: this.__mapElement.offsetWidth,
    };
  };

  __getMap = () => {
    return document.getElementById(this.__mapID);
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

  constructor() {
    this.__build();
    this.__clear();
  }
}

export { Map };
