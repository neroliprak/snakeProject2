import s from "./Victory.module.scss";

const Victory = ({ replay, setGameVictory, score, difficulty }) => {
  const messageDifficulty = (score) => {
    if (score === 30) {
      return "Petit joueur, tu pourrais augmenter";
    } else if (score === 100) {
      return "Tu es dans la normalité";
    } else if (score === 200) {
      return "Tu es très très fort";
    } else if (score === 300) {
      return "Impossible";
    } else {
      return "Score non défini";
    }
  };
  const isReplay = () => {
    replay();
    setGameVictory(false);
  };
  return (
    <>
      <div className={s.victory}>
        <div className={s.wrapVictory}>
          <img className={s.imgVictory} src="/victory.png" alt="" />
          <p>{messageDifficulty(score)}</p>
          <p className={s.score}>
            {score} / {difficulty}
          </p>
          <div className={s.wrapBtn}>
            <button onClick={isReplay} className={s.btn}>
              Replay
            </button>
            <button
              onClick={() => window.location.reload()}
              className={s.btnMenu}
            >
              Menu
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Victory;
