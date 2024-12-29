import s from "./Item.module.scss";

const Item = ({ coordinates, type, color }) => {
  console.log("type" + type);
  console.log("color" + color);
  const style = {
    transform: `translate(${coordinates.x}px, ${coordinates.y}px)`,
    backgroundImage: type === "trap" ? `url(${color})` : `url(${color})`,
    width: "25px",
    height: "25px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };
  return <div className={`${s.item} ${s[`item_${type}`]}`} style={style}></div>;
};

export default Item;
