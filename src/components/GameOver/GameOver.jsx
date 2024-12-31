import s from "./GameOver.module.scss";

const GameOver = ({ replay, score, difficulty, death }) => {
  let textDeath = "";
  switch (death) {
    case 1:
      textDeath = "C'est le début d'une longue lignée de mort";
      break;
    case 2:
    case 3:
    case 4:
      textDeath = "Allez tu peux gagner";
      break;
    case 5:
      textDeath = "Bon ça suffit, tu ne fais que de perdre";
      break;
    case death > 5:
      textDeath = "...";
    default:
      textDeath = "";
      break;
  }
  // if (death === 1) {
  //   textDeath = "C'est le début d'une longue lignée de mort";
  // }
  // if(death)
  return (
    <div className={s.death}>
      <p className={s.textDeath}>
        {textDeath} ({death} ☠️)
      </p>
      <p className={s.score}>
        {score} / {difficulty}
      </p>
      <div className="flex">
        <button onClick={replay} className={s.btn}>
          Replay
        </button>
        <button onClick={() => window.location.reload()} className={s.btnMenu}>
          Menu
        </button>
      </div>
    </div>
  );
};

export default GameOver;
