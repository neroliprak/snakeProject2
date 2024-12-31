// components/HomePage/HomePage.jsx
import React from "react";
import s from "./HomePage.module.scss";
import Option from "../Option/Option";
import gsap from "gsap";
import { useState, useEffect } from "react";

const HomePage = ({ handleStartGame, setDifficulty, setTimeOut }) => {
  const [showOptions, setShowOptions] = useState(true);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const quitGame = () => {
    window.close();
  };
  useEffect(() => {
    if (showOptions) {
      gsap.fromTo(
        `.${s.partRight}`,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 1 }
      );
    }
  }, [showOptions]);

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
            <p onClick={toggleOptions} className={s.options}>
              <img className={s.optionsImage} src="/options.svg" alt="" />
              <p>Options</p>
            </p>
          </div>
        </div>
        {showOptions && (
          <div className={s.partRight}>
            <Option setDifficulty={setDifficulty} setTimeOut={setTimeOut} />
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
