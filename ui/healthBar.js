export class HealthBar {
  __element;
  __gameBoard;
  __ID;

  constructor(gameBoard) {
    this.__gameBoard = gameBoard;
    this.__ID = Math.floor(Math.random() * 1000000) + 1;
    this.createElement();
    this.updateView();
  }

  updateView = () => {
    if (!document.getElementById(this.__ID)) {
      this.__gameBoard.appendChild(this.__element);
    }
  };

  createElement = () => {
    this.__element = document.createElement("div");
    this.__element.classList.add("health-bar");
    this.__element.id = this.__ID;
  };

  init = () => {};
}
