import { Hero } from "./hero.js";
import { Enemy } from "./enemy.js";

import { Movements } from "./movements.js";
import { Battle } from "./battle.js";

// UI
import { Map } from "./ui/map.js";
import { HealthBar } from "./ui/healthBar.js";

class Game {
  __GAME_ID = "game";
  __GAME;
  __hero;
  __map;
  __movements;
  __battle;
  __lastRendered = 0;
  __amountOfEnemies = 3;
  __healthBar;

  init = (currentTime) => {
    window.requestAnimationFrame(this.init);

    const secondsSinceLastRender = (currentTime - this.__lastRendered) / 100;

    if (secondsSinceLastRender < 1 / this.__hero.getSpeed()) return;

    this.__lastRendered = currentTime;
  };

  constructor() {
    this.__GAME = document.getElementById(this.__GAME_ID);
    this.__battle = new Battle();

    this.__map = new Map(this.__GAME);
    this.__healthBar = new HealthBar(this.__GAME);
    this.__hero = new Hero(this.__healthBar);

    this.__movements = new Movements(this.__hero, this.__map);
    this.__movements.attachKeys();
    this.__map.placeUnit(this.__hero.__getCharacterElement());
    for (let i = 0; i < this.__amountOfEnemies; i++) {
      this.__map.placeUnit(
        new Enemy(
          this.__map,
          this.__battle,
          this.__hero
        ).__getCharacterElement()
      );
    }

    window.requestAnimationFrame(this.init);
  }
}

const game = new Game();
