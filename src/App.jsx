import { useState } from "react";
import DataCard from "./components/DataCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Keyboard } from "swiper";

function App() {
  const [dataCards, setDataCards] = useState([1, 2, 4]);
  return (
    <>
      <div className="bg-black flex">
        <Swiper
          direction={"vertical"}
          pagination={{
            clickable: true,
          }}
          className="h-screen flex"
          keyboard={true}
          modules={[Keyboard]}
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
