import { useEffect, useState } from "react";
import DataCard from "./components/DataCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Keyboard, Mousewheel } from "swiper";
import axios from "axios";
import { api } from "./api";

function App() {
  const [dataCards, setDataCards] = useState([1, 2, 4]);

  const getFacts = () => {
    axios
      .get(`${api}/facts/`)
      .then((res) => {
        setDataCards(res.data.facts);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getFacts();
  }, []);

  return (
    <>
      <div className="bg-black ">
        <Swiper
          direction={"vertical"}
          pagination={{
            clickable: true,
          }}
          className="h-screen"
          keyboard={true}
          modules={[Keyboard, Mousewheel]}
          mousewheel={true}
        >
          {dataCards.map((dataCard, key) => (
            <SwiperSlide key={key}>
              <DataCard dataCard={dataCard} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default App;
