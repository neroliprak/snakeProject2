import React from "react";
import s from "./Option.module.scss";
import useStore from "../../utils/store";
import { useState } from "react";

const Option = ({ setDifficulty, setTimeOut }) => {
  const { setSkin } = useStore();
  const [selectedSkin, setSelectedSkin] = useState(null);

  const handleSkinSelection = (urlSkin) => {
    setSkin(urlSkin);
    setSelectedSkin(urlSkin);
  };

  const handleDifficultyChange = (e) => {
    const value = e.target.value;
    setDifficulty(value);
  };

  const handleTimeOutChange = (e) => {
    const value = e.target.value;
    setTimeOut(value);
  };

  return (
    <>
      <div className={s.options}>
        <h2>Options</h2>
        <div className={s.option1}>
          <p className={s.optionTitle}>Choose your skin</p>
          <div className={s.wrapSkin}>
            <div
              onClick={() => handleSkinSelection("./dj-snake-skin15px.svg")}
              className={`${s.wrapSkin1} ${
                selectedSkin === "./dj-snake-skin15px.svg" ? s.selected : ""
              }`}
            >
              <img className={s.skin1} src="./dj-snake-skin1.png" alt="" />
              <p>Dj Snake</p>
            </div>
            <div
              onClick={() => handleSkinSelection("./snake-skin2.svg")}
              className={`${s.wrapSkin2} ${
                selectedSkin === "./snake-skin2.svg" ? s.selected : ""
              }`}
            >
              <img className={s.skin2} src="./snake-skin2.svg" alt="" />
              <p>Snake</p>
            </div>
          </div>
        </div>
        <div className={s.option2}>
          <label htmlFor="time">
            <p className={s.optionTitle}>Choose your countdown</p>
          </label>
          <br />
          <div className="align-item">
            <input
              onChange={handleTimeOutChange}
              className={s.inputNumberOption}
              type="number"
              id="time"
              name="time"
              min="1"
              max="1000"
              placeholder="20"
            ></input>
            <span className={s.seconde}>s</span>
          </div>
        </div>
        <div className={s.option3}>
          <label htmlFor="difficulty">
            <p className={s.optionTitle}>Choose your difficulty</p>
          </label>
          <br />
          <select
            onChange={handleDifficultyChange}
            className={s.difficulty}
            id="difficulty"
            name="difficulty"
          >
            <option value="100">Reach 30 pts</option>
            <option value="100">Reach 100 pts</option>
            <option value="200">Reach 200 pts</option>
            <option value="300">Reach 300 pts</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Option;
