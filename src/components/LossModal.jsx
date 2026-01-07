const LossModal = ({
  isVisible,
  lossCount,
  onRestart,
  onShowCards,
}) => {
  if (!isVisible) return null;

  return (
    <div className='game-modal'>
      <div className='game-modal-content'>
        <h1>Perdu</h1>
        {lossCount > 0 && (
          <span className='loss-message'>
            Vous avez perdu {lossCount} fois
          </span>
        )}
        <button onClick={onRestart}>Recommencer</button>
        <button onClick={onShowCards}>Afficher les cartes</button>
      </div>
    </div>
  );
};

export default LossModal;
