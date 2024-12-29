import s from "./ProgressBar.module.scss";
import { useEffect, useState } from "react";

const ProgressBar = ({ progress, gameOver }) => {
  const [maxProgress, setMaxProgress] = useState(null);
  const roundedProgress = Math.ceil(progress);
  const pourcentage = maxProgress ? (progress / maxProgress) * 100 : 0;

  useEffect(() => {
    if (gameOver) {
      const audioRedTimeOut = document.getElementById("redTimeOut-music");
      if (audioRedTimeOut && !audioRedTimeOut.paused) {
        audioRedTimeOut.pause();
      }
    }
  }, [gameOver]);
  const progressColorBis = (pourcentage) => {
    if (pourcentage <= 33) {
      return "#FF6767";
    } else if (pourcentage <= 66) {
      return "#FFAD5A";
    } else {
      return "#69E295";
    }
  };

  const progressColor = progressColorBis(pourcentage);

  useEffect(() => {
    // Définir maxProgress uniquement lors de la première exécution
    if (maxProgress === null) {
      setMaxProgress(progress);
    }

    // Lecture ou pause de l'audio en fonction du pourcentage
    const audioRedTimeOut = document.getElementById("redTimeOut-music");

    if (pourcentage <= 33) {
      if (audioRedTimeOut) {
        // Si l'audio est déjà en pause, on le joue
        if (audioRedTimeOut.paused) {
          audioRedTimeOut.currentTime = 0;
        }
      }
    } else {
      // Si le pourcentage est supérieur à 33, on met l'audio en pause
      if (audioRedTimeOut && !audioRedTimeOut.paused) {
        audioRedTimeOut.pause();
      }
    }
  }, [progress, pourcentage, maxProgress]);

  return (
    <div className={s.progressbar}>
      <p>{roundedProgress} s</p>
      <progress
        style={{
          accentColor: progressColor,
        }}
        id="file"
        max={maxProgress || 100} // Assurez-vous que `max` a une valeur par défaut
        value={progress}
      >
        {progress}
      </progress>
    </div>
  );
};

export default ProgressBar;
