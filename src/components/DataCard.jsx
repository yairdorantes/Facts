import Comments from "./Comments";
import Reaction from "./Reaction";

const DataCard = () => {
  return (
    <div className="mt-0">
      <div
        className="relative h-[500px] bg-cover bg-center sm:w-[350px] w-auto rounded-lg "
        style={{
          borderColor: "white",
          backgroundImage:
            "url(" +
            "https://news.microsoft.com/wp-content/uploads/prod/sites/61/2023/03/Halo-Infinite-Temporada-3_Echoes-Within-1.jpg" +
            ")",
        }}
      >
        <div className="bg-semi-trans text-white rounded-lg  flex items-center justify-center h-full">
          <p className="w-3/4 text-center">
            Sabías que el pulpo tiene tres corazones. Sí, has oído bien, ¡tres
            corazones! Dos de los corazones se utilizan para bombear la sangre a
            las branquias, y el tercer corazón bombea la sangre al resto del
            cuerpo del pulpo
          </p>
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
