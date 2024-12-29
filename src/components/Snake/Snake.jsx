import { useEffect, useState } from "react";
import useStore from "../../utils/store";
import s from "./Snake.module.scss";

const Snake = ({ data, color, colorArray, setColorArray }) => {
  const { skin } = useStore();

  console.log(colorArray);

  useEffect(() => {
    if (color && color !== "") {
      setColorArray((prevArray) => [...prevArray, color]);
    }
  }, [color]);

  const getStyle = (dot, i) => {
    let background = null;

    if (i === data.length - 1) {
      background = `url('/dj-snake-skin15px.svg')`; // Tête du serpent
    } else if (i === data.length - 2) {
      background = `url('/cleSol.svg')`; // Avant dernier dot
    } else {
      const colorIndex = i < colorArray.length ? i : colorArray.length - 1;

      background = `url('${colorArray[colorIndex]}')`;
    }

    const style = {
      transform: `translate(${dot[0]}px, ${dot[1]}px)`,
      backgroundImage: background,
      backgroundColor: background,
      width: "25px",
      height: "25px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
    };

    return style;
  };

  return (
    <>
      {data.map((dot, i) => (
        <div key={i} className={s.snakeDot} style={getStyle(dot, i)}></div>
      ))}
    </>
  );
};

export default Snake;
