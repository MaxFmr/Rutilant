import { getFromLocalStorage } from '../utils/localStorage';
import './LevelSelect.css';

const LevelSelect = ({
  currentLevel,
  setCurrentLevel,
  startCurrentLevel,
  setDisplayLevelSelect,
}) => {
  const maxLevel = getFromLocalStorage('maxLevel', 1);

  const selectLevel = (level) => {
    setCurrentLevel(level);
    startCurrentLevel(level);
    setDisplayLevelSelect(false);
  };

  const goBack = () => {
    setDisplayLevelSelect(false);
  };

  // Générer les boutons pour les 9 niveaux
  const levels = Array.from({ length: 9 }, (_, i) => i + 1);

  return (
    <div className='level-select-container'>
      <h1 className='level-select-title'>📊 Sélection du Niveau</h1>
      <p className='level-select-subtitle'>
        Choisissez votre niveau de difficulté
      </p>

      <div className='level-grid'>
        {levels.map((level) => (
          <button
            key={level}
            className={`level-button ${level > maxLevel ? 'locked' : ''}`}
            onClick={() => level <= maxLevel && selectLevel(level)}
            disabled={level > maxLevel}>
            Niveau {level}
            {level > maxLevel && ' 🔒'}
          </button>
        ))}
      </div>

      <button className='back-button' onClick={goBack}>
        ← Retour
      </button>
    </div>
  );
};
export default LevelSelect;
