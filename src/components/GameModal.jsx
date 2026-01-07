const GameModal = ({
  isVisible,
  isWon,
  lossCount,
  onContinue,
  onRestart,
  onShowCards,
}) => {
  if (!isVisible) return null;

  return (
    <div className='game-modal'>
      <div className='game-modal-content'>
        <h1>{isWon ? 'Gagné' : 'Perdu'}</h1>
        {!isWon && lossCount > 0 && (
          <span className='loss-message'>
            Vous avez perdu {lossCount} fois
          </span>
        )}
        {isWon ? (
          <button onClick={onContinue}>Continuer</button>
        ) : (
          <>
            <button onClick={onRestart}>Recommencer</button>
            <button onClick={onShowCards}>Afficher les cartes</button>
          </>
        )}
      </div>
    </div>
  );
};

export default GameModal;
