import { useState, useEffect } from 'react';

const Card = ({
  card,
  cardsClicked,
  setCardsClicked,
  isLost,
  setIsLost,
  isWon,
  setIsWon,
  setCurrentLevel,
  currentLevel,
}) => {
  const [isClickable, setIsClickable] = useState(true);
  const BackPath = new URL(
    `../assets/Carrds/back/0${card.back}_Back.png`,
    import.meta.url
  ).href;
  const FrontPath = new URL(
    `../assets/Carrds/front/0${card.value}_Front.png`,
    import.meta.url
  ).href;

  const playCard = () => {
    if (!isClickable) return;

    // Compter combien de cartes ont déjà été cliquées
    const clickedCount = cardsClicked.filter(Boolean).length;
    const expectedValue = clickedCount + 1;

    // Calculer le nombre de cartes pour ce niveau (niveau 1 = 2 cartes, max 10)
    const numberOfCards = Math.min(currentLevel + 1, 10);

    // Vérifier si c'est la bonne carte
    if (card.value === expectedValue) {
      // Bonne carte - la marquer comme cliquée
      handleClick(card.value);
      setIsClickable(false);

      // Vérifier si c'était la dernière carte du niveau
      if (expectedValue === numberOfCards) {
        setIsWon(true);
        setCurrentLevel(currentLevel + 1);
      }
    } else {
      // Mauvaise carte - perdre
      handleClick(card.value);
      setIsClickable(false);
      setIsLost(true);
    }
  };

  const handleClick = (cardValue) => {
    const index = cardValue - 1;
    if (cardsClicked[index] === true) return;
    const newCardsClicked = [...cardsClicked];
    newCardsClicked[index] = true;
    setCardsClicked(newCardsClicked);
    setIsClickable(false);
  };

  useEffect(() => {
    setIsClickable(true);
    isLost && setIsClickable(false);
  }, [isWon, isLost]);

  return (
    <>
      <div
        className='card'
        onClick={() => {
          isClickable && playCard();
        }}>
        {!cardsClicked[card.value - 1] ? (
          <img src={BackPath} alt='Carte' />
        ) : (
          <img src={FrontPath} alt='Carte' />
        )}
      </div>

      <span>{card.value}</span>
    </>
  );
};
export default Card;
