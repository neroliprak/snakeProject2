// components/HomePage/HomePage.jsx
import React from "react";
import s from "./HomePage.module.scss";
import Option from "../Option/Option";

const HomePage = ({ handleStartGame, setDifficulty, setTimeOut }) => {
  const quitGame = () => {
    window.close();
  };
  return (
    <>
      <div className={s.homePage}>
        <div className={s.partLeft}>
          <h1>Snake</h1>
          <div className={s.wrapHomePage}>
            <div onClick={handleStartGame} className={s.startGame}>
              <img src="./logo-start.svg" alt="" />
              <p>Start Game</p>
            </div>
            <div onClick={quitGame} className={s.quitGame}>
              <img src="./logo-quit.svg" alt="" />
              <p>Quit Game</p>
            </div>
          </div>
        </div>
        <div className={s.partRight}>
          <Option setDifficulty={setDifficulty} setTimeOut={setTimeOut} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
