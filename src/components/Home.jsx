import { getFromLocalStorage } from '../utils/localStorage';
import './Home.css';

const Home = ({
  setDisplayHome,
  currentLevel,
  setCurrentLevel,
  setDisplayLevelSelect,
  displayLevelSelect,
  startCurrentLevel,
}) => {
  const maxLevel = getFromLocalStorage('maxLevel', 1);

  const continueGame = () => {
    setDisplayHome(false);
    setCurrentLevel(maxLevel);
    startCurrentLevel(maxLevel);
    displayLevelSelect && setDisplayLevelSelect(false);
  };

  const levelSelect = () => {
    setDisplayHome(false);
    setDisplayLevelSelect(true);
  };

  const restartFromBeginning = () => {
    setDisplayHome(false);
    setCurrentLevel(1);
    startCurrentLevel(1);
    displayLevelSelect && setDisplayLevelSelect(false);
  };

  return (
    <div className='home-container'>
      {/* Éléments décoratifs */}
      <div className='home-decoration circle circle-1'></div>
      <div className='home-decoration circle circle-2'></div>

      <h1 className='home-title'>🎮 RUTILANT</h1>
      <p className='home-subtitle'>
        Tentez votre chance et atteignez le niveau maximum!
      </p>

      <div className='home-buttons'>
        {maxLevel === 1 ? (
          <button
            className='home-button'
            onClick={() => {
              setDisplayHome(false);
            }}>
            ▶ Nouvelle Partie
          </button>
        ) : (
          <button className='home-button' onClick={continueGame}>
            ▶ Continuer (Niveau {maxLevel})
          </button>
        )}

        {maxLevel > 1 && (
          <>
            <button className='home-button secondary' onClick={levelSelect}>
              📊 Sélection du niveau
            </button>
            <button
              className='home-button secondary'
              onClick={restartFromBeginning}>
              🎯 Recommencer depuis le début
            </button>
            <button
              className='home-button danger'
              onClick={() => {
                if (
                  window.confirm(
                    'Voulez-vous vraiment réinitialiser toute votre progression? Cette action est irréversible.'
                  )
                ) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}>
              🔄 Réinitialiser la progression
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
