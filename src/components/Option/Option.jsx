import React from "react";
import s from "./Option.module.scss";

const Option = ({ setDifficulty, setTimeOut }) => {
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
            <div className={s.wrapSkin1}>
              <img className={s.skin1} src="./dj-snake-skin1.png" alt="" />
              <p>Dj Snake</p>
            </div>
            <div className={s.wrapSkin2}>
              <img className={s.skin2} src="./snake-skin2.png" alt="" />
              <p>Snake</p>
            </div>
          </div>
        </div>
        <div className={s.option2}>
          <label htmlFor="time">
            <p className={s.optionTitle}>Choose your timing</p>
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
              placeholder="60"
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
            <option value="100">Sur 100</option>
            <option value="200">Sur 200</option>
            <option value="300">Sur 300</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Option;
