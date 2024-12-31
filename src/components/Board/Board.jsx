import { useEffect, useState, useRef } from "react";
import Snake from "../Snake/Snake";
import gsap from "gsap";
import s from "./Board.module.scss";
import Item from "../Item/Item";
import Victory from "../Victory/Victory";
import ProgressBar from "../ProgressBar/ProgressBar";
import {
  defaultControls,
  flashUser,
  generateRandomCoordinates,
  triggerMode,
  reversedControls,
  wizz,
  netherPortal,
} from "../../utils/utils";
import GameOver from "../GameOver/GameOver";
import useStore from "../../utils/store";
import Submit from "../Submit/Submit";
import Scoreboard from "../Scoreboard/Scoreboard";

const Board = ({ difficulty, timeOut }) => {
  const { mode, removeMode } = useStore();
  const [paused, setPaused] = useState(false);
  const [snakeData, setSnakeData] = useState([
    [0, 0],
    [25, 0],
  ]);
  const [colorSnake, setColorSnake] = useState("");
  const [colorArray, setColorArray] = useState([]);
  const foodColors = [
    "/noteDo.svg",
    "/noteRe.svg",
    "/noteMi.svg",
    "/noteFa.svg",
    "/noteSol.svg",
    "/noteLa.svg",
    "/noteSi.svg",
  ];
  const trapColors = [
    "/brasBroke.svg",
    "/jambeBroke.svg",
    "/instrumentBroke.svg",
  ];
  const [trapArray, setTrapArray] = useState([]);
  const [foodArray, setFoodArray] = useState([]);
  const [progress, setProgress] = useState(timeOut);

  const [hasEnteredResults, setHasEnteredResults] = useState(false);

  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(0.3);
  const [score, setScore] = useState(0);
  const [death, setDeath] = useState(0);
  const [victory, setVictory] = useState(0);
  const [gameVictory, setGameVictory] = useState(false);

  const timer = useRef(0);
  const foodTimer = useRef(0);
  const trapTimer = useRef(0);
  const direction = useRef("RIGHT");
  const canChangeDirection = useRef(true);

  const gameIsOver = () => {
    gsap.ticker.remove(gameLoop);
    setProgress(0);

    setDeath(death + 1);

    const video = document.getElementById("die-video");
    video.style.display = "block";

    video.currentTime = 0;
    video.play();

    const backgroundMusic = document.getElementById("background-music");
    backgroundMusic.pause();

    setGameOver(true);
  };

  const gameIsVictory = () => {
    gsap.ticker.remove(gameLoop);
    setGameVictory(true);
  };

  const isOutOfBorder = (head) => {
    if (head[0] >= 525 || head[1] >= 525 || head[0] < 0 || head[1] < 0) {
      return true;
    } else {
      return false;
    }
  };

  const hasEatenItem = ({ getter, setter }) => {
    const head = snakeData[snakeData.length - 1];

    // comparer les coordonnées de la tête du snake avec LES food
    const item = getter.find(
      (_item) => _item.x === head[0] && _item.y === head[1]
    );

    if (item) {
      setColorSnake(item.colorFood);
      // si y'a match on renvoie true
      switch (item.colorFood) {
        case "/noteDo.svg":
          document.getElementById("sound-do").play();
          break;
        case "/noteRe.svg":
          document.getElementById("sound-re").play();
          break;
        case "/noteMi.svg":
          document.getElementById("sound-mi").play();
          break;
        case "/noteFa.svg":
          document.getElementById("sound-fa").play();
          break;
        case "/noteSol.svg":
          document.getElementById("sound-sol").play();
          break;
        case "/noteLa.svg":
          document.getElementById("sound-la").play();
          break;
        case "/noteSi.svg":
          document.getElementById("sound-si").play();
          break;
        default:
          break;
      }
      // mettre à jour le tableau des food disponibles
      const newItemArray = getter.filter((_item) => _item !== item);
      setter(newItemArray);

      return true;
    } else {
      // sinon on renvoie false
      return false;
    }
  };

  const moveSnake = () => {
    if (gameVictory) return;

    let newSnakeData = [...snakeData];
    let head = newSnakeData[newSnakeData.length - 1];

    // console.log(head);

    switch (direction.current) {
      case "RIGHT":
        head = [head[0] + 25, head[1]];

        break;
      case "LEFT":
        head = [head[0] - 25, head[1]];

        break;
      case "DOWN":
        head = [head[0], head[1] + 25];

        break;
      case "UP":
        head = [head[0], head[1] - 25];

      default:
        break;
    }

    newSnakeData.push(head);
    newSnakeData.shift();

    const snakeCollapsed = hasCollapsed(head);
    const outOfBorder = isOutOfBorder(head);
    const snakeAteFood = hasEatenItem({
      getter: foodArray,
      setter: setFoodArray,
    });
    const snakeAteTrap = hasEatenItem({
      getter: trapArray,
      setter: setTrapArray,
    });

    // console.log(snakeCollapsed);

    if (score >= difficulty) {
      gameIsVictory();
    }

    if (outOfBorder || snakeCollapsed || progress === 0) {
      gameIsOver();
    } else {
      if (snakeAteTrap === true) {
        // trap execution logic

        const effects = [flashUser, triggerMode, wizz, netherPortal];

        const selectedEffect =
          effects[Math.floor(Math.random() * effects.length)];

        selectedEffect();

        document.getElementById("trap-sound").play();
      }
      if (snakeAteFood === true) {
        setProgress(timeOut);
        // agrandir le serpent
        newSnakeData.unshift([]);

        setScore(score + 10);

        if (speed > 0.05) {
          // console.log("speed =", speed);
          setSpeed(speed - 0.02);
        }
      }
      setSnakeData(newSnakeData);
    }
  };

  const hasCollapsed = (head) => {
    let snake = [...snakeData];
    // let head = snake[snake.length - 1];

    // retire la dernière case du tableau
    snake.pop();

    // comparer les coordonnées de head (tête du snake) avec les autres points du snake
    for (let i = 0; i < snake.length; i++) {
      if (head[0] === snake[i][0] && head[1] === snake[i][1]) {
        // si match renvoie true
        return true;
      }
    }

    // sinon renvoie false
    return false;
  };

  const onKeyDown = (e) => {
    // console.log(e);
    if (canChangeDirection.current === false) return;
    canChangeDirection.current = false;

    mode.includes("reversed")
      ? reversedControls(e, direction)
      : defaultControls(e, direction);
  };

  const addItem = ({ getter, setter, type }) => {
    // génération de coordonnées
    const coordinates = generateRandomCoordinates(mode);

    //fusion des deux tableaux
    const array = [...foodArray, ...trapArray];

    //test pour savoir si un item est déjà existant à cet endroit
    const itemAlreadyExistsHere = array.some(
      (item) => item.x === coordinates.x && coordinates.y === item.y
    );

    // si ça existe déjà, rappeler la fonction
    if (itemAlreadyExistsHere) {
      addItem({ getter, setter });
      return;
    }

    const colorFood =
      type === "trap"
        ? trapColors[Math.floor(Math.random() * trapColors.length)]
        : foodColors[Math.floor(Math.random() * foodColors.length)];

    setter((oldArray) => [...oldArray, { ...coordinates, colorFood }]);
  };

  const gameLoop = (time, deltaTime, frame) => {
    // console.log(time, deltaTime, frame);
    // console.log("game loop");
    timer.current += deltaTime * 0.001;
    foodTimer.current += deltaTime * 0.001;
    trapTimer.current += deltaTime * 0.001;

    // ici, gestion de l'apparition de la nourriture
    if (foodTimer.current > 2 && foodArray.length < 50) {
      foodTimer.current = 0;
      addItem({
        getter: foodArray,
        setter: setFoodArray,
      });
    }

    // ici, gestion des pièges
    if (trapTimer.current > 3 && trapArray.length < 10) {
      trapTimer.current = 0;
      addItem({
        getter: trapArray,
        setter: setTrapArray,
        type: "trap",
      });
    }

    if (timer.current > (mode.includes("impossible") ? 0.02 : speed)) {
      timer.current = 0;
      moveSnake();
      canChangeDirection.current = true;
    }
  };

  const replay = () => {
    // replay game
    setColorArray([]);

    setProgress(timeOut);
    removeMode("corner");
    removeMode("impossible");
    removeMode("reversed");

    const video = document.getElementById("die-video");
    video.style.display = "none";
    video.pause();

    const audio = document.getElementById("background-music");
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }

    //reset game over
    setGameOver(false);
    setHasEnteredResults(false);
    setSpeed(0.3); // reset speed
    setScore(0); // reset score

    //reset data snake
    setSnakeData([
      [0, 0],
      [25, 0],
    ]);
    //reset food
    setFoodArray([]);
    setTrapArray([]);

    //reset direction
    direction.current = "RIGHT";

    //reset timer
    timer.current = 0;

    //reset food timer
    foodTimer.current = 0;
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev > 0 ? prev - 1.67 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    gsap.ticker.add(gameLoop);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      gsap.ticker.remove(gameLoop);
    };
  }, [snakeData]);

  // const pauseGame = () => {
  //   console.log("pause game");
  //   if (paused) {
  //     gsap.ticker.add(gameLoop);
  //     setPaused(false);
  //   } else {
  //     setPaused(true);
  //     timer.current = 0;
  //     foodTimer.current = 0;

  //     gsap.ticker.remove(gameLoop);
  //   }
  // };

  return (
    <>
      {gameVictory && (
        <>
          <Victory
            replay={replay}
            setGameVictory={setGameVictory}
            score={score}
            difficulty={difficulty}
          />
        </>
      )}

      {!gameVictory && (
        <>
          <ProgressBar progress={progress} GameOver={gameOver} />
          {gameOver && (
            <>
              {!hasEnteredResults && (
                <Submit
                  score={score}
                  death={death}
                  difficulty={difficulty}
                  setHasEnteredResults={setHasEnteredResults}
                />
              )}
              <GameOver
                replay={replay}
                score={score}
                difficulty={difficulty}
                death={death}
              />

              <Scoreboard />
            </>
          )}

          {/* Le tableau de jeu avec le serpent, la nourriture et les pièges */}
          <audio
            id="background-music"
            src="/musiqueDefaultGame.mp3"
            loop
            autoPlay
          />
          <audio id="redTimeOut-music" src="/redTimeOut.mp3" />

          <audio id="sound-do" src="/soundDo.mp3" />
          <audio id="sound-re" src="/soundRe.mp3" />
          <audio id="sound-mi" src="/soundMi.mp3" />
          <audio id="sound-fa" src="/soundFa.mp3" />
          <audio id="sound-sol" src="/soundSol.mp3" />
          <audio id="sound-la" src="/soundLa.mp3" />
          <audio id="sound-si" src="/soundSi.mp3" />

          <audio id="trap-sound" src="/bruitageStrident.mp3" />

          <div id="board" className={s.board}>
            <Snake
              data={snakeData}
              color={colorSnake}
              colorArray={colorArray}
              setColorArray={setColorArray}
            />

            <span className={s.score}>
              Score : {score} / {difficulty}
            </span>

            <span className={s.death}>💀 Death: {death}</span>

            {/* Affiche les éléments alimentaires */}
            {foodArray.map((coordinates) => (
              <Item
                key={coordinates.id}
                coordinates={coordinates}
                type="food"
                color={coordinates.colorFood}
              />
            ))}

            {/* Affiche les pièges */}
            {trapArray.map((coordinates) => (
              <Item
                key={coordinates.id}
                coordinates={coordinates}
                type="trap"
                color={coordinates.colorFood}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Board;
