import s from "./Victory.module.scss";

const Victory = ({ replay, setGameVictory }) => {
  const isReplay = () => {
    replay();
    setGameVictory(false);
  };
  return (
    <>
      <div className={s.victory}>
        <div className={s.wrapVictory}>
          <p>Bravo tu as gagné</p>
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
