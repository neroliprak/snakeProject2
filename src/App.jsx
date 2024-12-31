import React, { useState } from "react";
import Board from "./components/Board/Board";
import Toggle from "./components/Toggle/Toggle";
import { useDropzone } from "react-dropzone";
import useStore from "./utils/store";
import HomePage from "./components/HomePage/HomePage"; // Importation de la HomePage

function App() {
  const { skin, setSkin } = useStore();
  const [difficulty, setDifficulty] = useState(30); // État de la difficulté sélectionné
  const [timeOut, setTimeOut] = useState(20);
  console.log(timeOut);
  const [gameStarted, setGameStarted] = useState(false); // État pour savoir si le jeu a commencé
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/svg": [],
      "image/webp": [],
      "image/gif": [],
    },
    maxFiles: 1,
    noClick: true,
    onDrop: (file) => onDrop(file),
  });

  // Fonction pour gérer l'ajout de l'image skin
  const onDrop = (file) => {
    const src = URL.createObjectURL(file[0]);
    setSkin(src); // Mise à jour du skin dans le store
  };

  // Fonction pour démarrer le jeu
  const handleStartGame = () => {
    const audio = document.getElementById("background-music");
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
    setGameStarted(true); // Le jeu commence
  };

  return (
    <div className="filter-opcacity">
      {/* <img className="background-game" src="/background-game.jpg" alt="" /> */}
      {/* Page d'accueil */}
      {!gameStarted ? (
        <>
          {/* <img className="background-game" src="/background-game.jpg" alt="" /> */}
          <HomePage
            setDifficulty={setDifficulty}
            handleStartGame={handleStartGame}
            setTimeOut={setTimeOut}
          />
        </>
      ) : (
        <>
          {/* <img className="background-game" src="/background-game.jpg" alt="" /> */}
          <Board difficulty={difficulty} timeOut={timeOut} />
          {/* Vidéos de fond */}
          <div className="filter-opcacity">
            <video
              src="/deathShark.mp4"
              id="die-video"
              className="die-video"
              muted
            ></video>
          </div>
          <video
            src="/nether.mp4"
            id="nether-video"
            className="nether-video"
            autoPlay
            loop
            muted
          ></video>
          {/* Zone de dépôt pour l'image skin */}
          {/* <div {...getRootProps({ className: "dropzone" })}> */}
          {/* <input {...getInputProps()} /> */}
          {/* {skin && <img src={skin} alt="Skin" />}{" "} */}
          {/* Affichage du skin si défini */}
          {/* </div> */}
          {/* Animation flashbang */}
          <div className="flashbang"></div>
          {/* Wrapper pour les toggles de mode */}
          <div className="toggle-wrapper">
            <p>Choisissez un mode</p>
            <Toggle mode={"corner"} />
            <Toggle mode={"impossible"} />
            <Toggle mode={"reversed"} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
