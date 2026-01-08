import Card from "./components/Card";
import { useState, useEffect } from "react";
import "./App.css";
import shuffleArray from "./utils/shuffleArray";
import Home from "./components/Home";
import { GoGear } from "react-icons/go";
import LevelSelect from "./components/LevelSelect";
import GameModal from "./components/GameModal";
import { getFromLocalStorage, setToLocalStorage } from "./utils/localStorage";

const App = () => {
  //a utiliser pour le suivi des niveaux et des sauvegardes
  // const [maxLevel, setMaxLevel] = useState({
  //   level1: true,
  //   level2: false,
  //   level3: false,
  //   level4: false,
  //   level5: false,
  //   level6: false,
  //   level7: false,
  //   level8: false,
  //   level9: false,
  //   level10: false,
  // });

  const [cardsClicked, setCardsClicked] = useState(Array(10).fill(false));

  const [lossCount, setLossCount] = useState(0);
  const [bestScore, setBestScore] = useState({});
  const [gamesPlayed, setGamesPlayed] = useState(0);

  const [currentLevel, setCurrentLevel] = useState(1);
  const [cards, setCards] = useState([]);
  const [isLost, setIsLost] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [displayButton, setDisplayButton] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [displayHome, setDisplayHome] = useState(false);
  const [displayLevelSelect, setDisplayLevelSelect] = useState(false);

  function startCurrentLevel(level) {
    const backValues = [];
    const valueValues = [];

    // Le niveau 1 commence avec 2 cartes, jusqu'à un maximum de 10 cartes
    const numberOfCards = Math.min(level + 1, 10);

    for (let i = 0; i < numberOfCards; i++) {
      backValues.push(i + 1);
      valueValues.push(i + 1);
    }
    const array = [];
    setDisplayButton(false);
    setDisplayMessage(false);
    setCards([]);
    setIsLost(false);
    setIsWon(false);

    setCardsClicked(Array(10).fill(false));

    shuffleArray(backValues);
    shuffleArray(valueValues);

    for (let i = 0; i < numberOfCards; i++) {
      const card = {
        back: backValues.pop(),
        value: valueValues.pop(),
      };
      array.push(card);
    }

    setCards(array);
  }

  useEffect(() => {
    const maxLevel = getFromLocalStorage("maxLevel", 1);
    const savedBestScore = getFromLocalStorage("bestScore", {});
    const savedGamesPlayed = getFromLocalStorage("gamesPlayed", 0);

    if (!maxLevel) {
      setToLocalStorage("maxLevel", currentLevel);
    }

    setBestScore(savedBestScore);
    setGamesPlayed(savedGamesPlayed);

    // Toujours afficher le menu au démarrage
    setDisplayHome(true);

    startCurrentLevel(currentLevel);
  }, []);

  useEffect(() => {
    if (isLost) {
      setTimeout(() => {
        setDisplayMessage(true);
        setDisplayButton(true);
        setLossCount(lossCount + 1);
        setCurrentLevel(1); // Retour au niveau 1 à chaque perte

        // Incrémenter le nombre total de parties jouées
        const newGamesPlayed = gamesPlayed + 1;
        setGamesPlayed(newGamesPlayed);
        setToLocalStorage("gamesPlayed", newGamesPlayed);
      }, 350);
    }
    if (isWon) {
      setDisplayButton(true);
      setDisplayMessage(true);

      // Passer au niveau suivant
      const nextLevel = currentLevel + 1;
      setCurrentLevel(nextLevel);
      setToLocalStorage("maxLevel", nextLevel);

      const memorizedScore = getFromLocalStorage("bestScore", {});

      setToLocalStorage("bestScore", {
        ...memorizedScore,
        [currentLevel]: lossCount,
      });
      setLossCount(0);
    }
  }, [isLost, isWon]);

  const flipAllCards = () => {
    setCardsClicked(Array(10).fill(true));
  };

  return displayHome ? (
    <Home
      setDisplayHome={setDisplayHome}
      currentLevel={currentLevel}
      setCurrentLevel={setCurrentLevel}
      setDisplayLevelSelect={setDisplayLevelSelect}
      displayLevelSelect={displayLevelSelect}
      startCurrentLevel={startCurrentLevel}
    />
  ) : (
    <>
      {displayLevelSelect && (
        <LevelSelect
          currentLevel={currentLevel}
          setCurrentLevel={setCurrentLevel}
          startCurrentLevel={startCurrentLevel}
          setDisplayLevelSelect={setDisplayLevelSelect}
        />
      )}

      <GoGear
        className="settings"
        onClick={() => {
          setDisplayHome(true);
        }}
        size={30}
      />
      <div className="score-container">
        <div>
          <span>Niveau : {currentLevel}</span>
        </div>
        <div>
          <span>Parties jouées : {gamesPlayed}</span>
        </div>
        <div>
          <span>Meilleur niveau : {getFromLocalStorage("maxLevel", 1)}</span>
        </div>
      </div>

      <GameModal
        isVisible={(isWon || isLost) && displayMessage && displayButton}
        isWon={isWon}
        lossCount={lossCount}
        onContinue={() => startCurrentLevel(currentLevel)}
        onRestart={() => startCurrentLevel(currentLevel)}
        onShowCards={() => {
          flipAllCards();
          setDisplayMessage(false);
        }}
      />

      <div className="game-container">
        {cards &&
          !displayLevelSelect &&
          cards.map((card, index) => {
            return (
              <Card
                key={index}
                card={card}
                cardsClicked={cardsClicked}
                setCardsClicked={setCardsClicked}
                isLost={isLost}
                setIsLost={setIsLost}
                isWon={isWon}
                setIsWon={setIsWon}
                currentLevel={currentLevel}
              />
            );
          })}
      </div>
    </>
  );
};
export default App;

// Define arrays for "Back" and "Value" values
