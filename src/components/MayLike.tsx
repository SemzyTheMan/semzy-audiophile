import Button from "./button";
function MayLike({ name, imgSrc, clicked }) {
  return (
    <div className={"grid grid-cols-1 gap-4 h-full items-center text-center"}>
      <img src={imgSrc} alt="product link" style={{ width: "100%" }} />

      <h2 className="text-3xl h-16 font-medium">{name}</h2>
      <Button clicked={clicked} />
    </div>
  );
}

export default MayLike;
