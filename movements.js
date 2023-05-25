class Movements {
  __character;
  __map;
  __movement = 1;

  __isOutsideMap = (dir) => {
    const currentPos = this.__character.getPosition();

    if (
      (currentPos.y <= 0 && dir === "up") ||
      (currentPos.y >= this.__map.getSize().h && dir === "down") ||
      (currentPos.x <= 0 && dir === "left") ||
      (currentPos.x >= this.__map.getSize().w && dir === "right")
    ) {
      return true;
    }
    return false;
  };

  __handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowUp":
        if (this.__isOutsideMap("up")) return;
        this.__character.move({ y: -1 * this.__movement });
        break;
      case "ArrowDown":
        if (this.__isOutsideMap("down")) return;
        this.__character.move({ y: 1 * this.__movement });
        break;
      case "ArrowLeft":
        if (this.__isOutsideMap("left")) return;
        this.__character.move({ x: -1 * this.__movement });
        break;
      case "ArrowRight":
        if (this.__isOutsideMap("right")) return;
        this.__character.move({ x: 1 * this.__movement });
        break;
    }
  };

  __handleClick = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    this.__character.move({ y, x });
  };

  attachKeys = () => {
    // window.removeEventListener("keydown", this.__handleKeyDown);
    // window.addEventListener("keydown", this.__handleKeyDown);
    window.removeEventListener("click", this.__handleClick);
    window.addEventListener("click", this.__handleClick);
  };

  constructor(character, map) {
    this.__character = character;
    this.__map = map;
  }
}

export { Movements };
