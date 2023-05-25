class Battle {
  constructor() {}

  __isInReach = (characterOne, characterTwo) => {
    const characterOneElement =
      characterOne.__characterElement.getBoundingClientRect();
    const characterTwoElement =
      characterTwo.__characterElement.getBoundingClientRect();

    return (
      characterOneElement.right + characterOne.getReach() >=
        characterTwoElement.left &&
      characterOneElement.left - characterOne.getReach() <=
        characterTwoElement.right &&
      characterOneElement.bottom + characterOne.getReach() >=
        characterTwoElement.top &&
      characterOneElement.top - characterOne.getReach() <=
        characterTwoElement.bottom
    );
  };
  isInReach = (characterOne, characterTwo) =>
    this.__isInReach(characterOne, characterTwo);
}

export { Battle };
