class Enemy {
  __ID;
  __characterInfo = {};
  __basicStyles = {};
  __map;
  __hero;
  __battle;
  __characterElement;
  __movements;
  __position = {};
  __reach = 10;
  __sight = 100;
  __speed = 10;
  __lifes = 5;
  __isDead = false;
  __updateFacing = (x, y) => {
    this.__characterElement.style.borderBottom = "";
    this.__characterElement.style.borderTop = "";
    this.__characterElement.style.borderLeft = "";
    this.__characterElement.style.borderRight = "";
    if (x != this.__position.x) {
      if (x > this.__position.x) {
        // this.__facing = "right";
        // this.__characterElement.style.borderRight = this.__facingStyle;
      } else {
        // this.__facing = "left";
        // this.__characterElement.style.borderLeft = this.__facingStyle;
      }
    }
    if (y != this.__position.y) {
      if (y > this.__position.y) {
        // this.__facing = "down";
        // this.__characterElement.style.borderBottom = this.__facingStyle;
      } else {
        // this.__facing = "up";
        // this.__characterElement.style.borderTop = this.__facingStyle;
      }
    }
  };

  __handleAttack = () => {
    if (this.__isDead) return;
    if (this.__battle.isInReach(this.__hero, this)) {
      this.__lifes = this.__lifes - 1;
      this.__characterElement.innerHTML = this.__lifes;
      if (!this.__lifes) {
        this.__isDead = true;
        const { x, y } = this.__getMovingPosition();
        this.__setPosition(x, y);
      }
    }
  };

  __updateReach = () => {
    this.__characterElement.style.boxShadow = `0px 0px 0px ${this.__reach}px #ff000060`;
  };

  __attachEvents = () => {
    this.__characterElement.removeEventListener("click", this.__handleAttack);
    this.__characterElement.addEventListener("click", this.__handleAttack);
  };

  __setPosition = (x, y) => {
    this.__updateFacing(x, y);
    this.__position.x = x;
    this.__position.y = y;
    this.__characterElement.style.setProp;
    this.__characterElement.style.top = `${y}px`;
    this.__characterElement.style.left = `${x}px`;
  };

  __createCharacter = () => {
    this.__characterElement = document.createElement("div");
    this.__characterElement.id = this.__ID;
    this.__characterElement.innerHTML = this.__lifes;
    this.__characterElement.classList.add("enemy");
    Object.keys(this.__basicStyles).forEach((key, idx) => {
      this.__characterElement.style[key] = this.__basicStyles[key];
    });
    this.__attachEvents();
  };

  __getCharacterElement = () => {
    return this.__characterElement;
  };

  __getMovingPosition = () => {
    const { top, left } = this.__characterElement.getBoundingClientRect();
    return { x: left, y: top };
  };

  __initiate = () => {
    this.__ID = Math.floor(Math.random() * 100000);
    this.__createCharacter();
    const randomPos = this.__map.randomPosition();
    this.__setPosition(randomPos.x, randomPos.y);
  };

  getPosition = () => this.__position;

  getSpeed = () => this.__speed;

  get = () => this.__getCharacterElement();

  fight = () => {};

  isDead = () => this.__isDead;

  lifes = () => this.__lifes;

  move = ({ y, x }) => {
    if (this.__isDead) return;
    this.__isMoving = true;
    var xD = x - this.__getMovingPosition().x;
    var yD = y - this.__getMovingPosition().y;
    const distance = Math.sqrt(xD * xD + yD * yD);
    const time = distance / this.__speed;
    this.__characterElement.style.transition = `left ${time}s linear, top ${time}s linear`;
    this.__setPosition(x, y);
  };
  __lastTime = 0;
  __isMoving = false;
  __handleTransitionEnd = () => {
    this.__isMoving = false;
    this.__randomMovement();
  };
  __randomMovement = () => {
    if (!this.__isMoving) {
      const y = Math.floor(Math.random() * this.__map.getSize().h) + 1;
      const x = Math.floor(Math.random() * this.__map.getSize().w) + 1;
      this.move({ y, x });
      this.__characterElement.removeEventListener(
        "transitionend",
        this.__handleTransitionEnd
      );
      this.__characterElement.addEventListener(
        "transitionend",
        this.__handleTransitionEnd
      );
    }
  };

  __alive = (time) => {
    if (this.__isDead) return;
    window.requestAnimationFrame(this.__alive);
    const secondsSinceLastRender = (time - this.__lastTime) / 1000;
    if (secondsSinceLastRender < 1 / this.__speed) return;
    this.__lastTime = time;

    this.__randomMovement();
  };

  constructor(map, battle, hero) {
    this.__map = map;
    this.__hero = hero;
    this.__battle = battle;
    this.__initiate();
    window.requestAnimationFrame(this.__alive);
  }
}

export { Enemy };
