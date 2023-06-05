class Hero {
  __ID;
  __characterInfo = {};
  __basicStyles = {
    height: "2rem",
    width: "2rem",
    background: "#fff",
    position: "absolute",
    "border-radius": "100px",
    "box-shadow": "0px 5px 10px #aaa",
  };
  __healthBar;
  __characterElement;
  __reach = 30;
  __movements;
  __lifes = 10;
  __position = {};
  __speed = 100;
  __facing = "right";
  __facingStyle = "3px solid green";

  __updateFacing = (x, y) => {
    this.__characterElement.style.borderBottom = "";
    this.__characterElement.style.borderTop = "";
    this.__characterElement.style.borderLeft = "";
    this.__characterElement.style.borderRight = "";
    if (x != this.__position.x) {
      if (x > this.__position.x) {
        this.__facing = "right";
        this.__characterElement.style.borderRight = this.__facingStyle;
      } else {
        this.__facing = "left";
        this.__characterElement.style.borderLeft = this.__facingStyle;
      }
    }
    if (y != this.__position.y) {
      if (y > this.__position.y) {
        this.__facing = "down";
        this.__characterElement.style.borderBottom = this.__facingStyle;
      } else {
        this.__facing = "up";

        this.__characterElement.style.borderTop = this.__facingStyle;
      }
    }
  };

  __setPosition = (x, y) => {
    this.__updateFacing(x, y);
    this.__position.x = x;
    this.__position.y = y;
    this.__characterElement.style.top = `${y}px`;
    this.__characterElement.style.left = `${x}px`;
  };

  __createCharacter = () => {
    this.__characterElement = document.createElement("div");
    this.__characterElement.id = this.__ID;
    Object.keys(this.__basicStyles).forEach((key, idx) => {
      this.__characterElement.style[key] = this.__basicStyles[key];
    });
    this.__updateReach();
  };

  __updateReach = () => {
    this.__characterElement.style.boxShadow = `0px 0px 0px ${this.__reach}px #ff000060`;
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
    this.__setPosition(100, 100);
  };

  getReach = () => this.__reach;

  getPosition = () => this.__position;

  getSpeed = () => this.__speed;

  get = () => this.__getCharacterElement();

  fight = () => {};

  move = ({ y, x }) => {
    var xD = x - this.__getMovingPosition().x;
    var yD = y - this.__getMovingPosition().y;
    const distance = Math.sqrt(xD * xD + yD * yD);
    const time = distance / this.__speed;
    this.__characterElement.style.transition = `left ${time}s linear, top ${time}s linear`;
    this.__setPosition(x, y);
  };

  constructor(healthBar) {
    this.__healthBar = healthBar;
    this.__initiate();
  }
}

export { Hero };
