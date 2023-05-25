import { Character } from "./character.js";
import { Enemy } from "./enemy.js";
import { Map } from "./map.js";
import { Movements } from "./movements.js";
import { Battle } from "./battle.js";

class Game {
  __character;
  __map;
  __movements;
  __battle;
  __lastRendered = 0;
  __amountOfEnemies = 3;

  init = (currentTime) => {
    window.requestAnimationFrame(this.init);

    const secondsSinceLastRender = (currentTime - this.__lastRendered) / 100;

    if (secondsSinceLastRender < 1 / this.__character.getSpeed()) return;

    this.__lastRendered = currentTime;
  };

  constructor() {
    this.__battle = new Battle();
    this.__map = new Map();
    this.__character = new Character();

    this.__movements = new Movements(this.__character, this.__map);
    this.__movements.attachKeys();
    this.__map.placeUnit(this.__character.__getCharacterElement());
    for (let i = 0; i < this.__amountOfEnemies; i++) {
      this.__map.placeUnit(
        new Enemy(
          this.__map,
          this.__battle,
          this.__character
        ).__getCharacterElement()
      );
    }

    window.requestAnimationFrame(this.init);
  }
}

const game = new Game();
