import Comments from "./Comments";
import Reaction from "./Reaction";

const DataCard = ({ dataCard }) => {
  return (
    <div className="mt-0">
      <div
        className="relative h-[500px] bg-cover bg-center sm:w-[350px] w-full rounded-lg "
        style={{
          borderColor: "white",
          backgroundImage: "url(" + dataCard.image + ")",
        }}
      >
        <div className="bg-semi-trans text-white rounded-lg  flex items-center justify-center h-full">
          <p className="w-3/4 text-center">{dataCard.description}</p>
        </div>
        <div className="absolute bottom-0">
          <span>189</span>
        </div>
      </div>
      <div className="relative flex gap-2 mt-1">
        <Reaction />
        <Comments />
      </div>
    </div>
  );
};

export default DataCard;
