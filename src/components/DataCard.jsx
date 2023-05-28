import Comments from "./Comments";
import Reaction from "./Reaction";

const DataCard = ({ dataCard, reaction }) => {
  return (
    <div className="mt-0 h-screen">
      <div
        className="relative h-full bg-cover bg-center sm:w-[550px] sm:mx-auto w-full rounded-lg "
        style={{
          borderColor: "white",
          backgroundImage: "url(" + dataCard.image + ")",
        }}
      >
        <div className="bg-semi-trans text-white rounded-lg  flex items-center justify-center h-full">
          <p className="w-3/4 text-center">{dataCard.description}</p>
        </div>
        <div className="absolute bottom-0"></div>
      </div>
      <div className="relative flex gap-2 -mt-20 justify-center">
        <Reaction fact={dataCard} reaction={reaction} />

        <Comments fact={dataCard} />
      </div>
    </div>
  );
};

export default DataCard;
