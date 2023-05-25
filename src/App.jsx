import { useContext, useEffect, useState } from "react";
import DataCard from "./components/DataCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Keyboard, Mousewheel } from "swiper";
import axios from "axios";
import { api } from "./api";
import UserComp from "./components/UserComp";
import AuthContext from "./components/UserContext";

function App() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  // console.log(user);
  const getUserData = () => {
    axios
      .get(`${api}/user/${user}`)
      .then((res) => {
        setUserData(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [dataCards, setDataCards] = useState([]);
  const getFacts = () => {
    axios
      .get(`${api}/facts/${3}`)
      .then((res) => {
        setDataCards(res.data.facts);
        console.log(res.data.facts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFacts();
    getUserData();
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
              <DataCard
                dataCard={dataCard}
                reaction={userData.likes && userData.likes[dataCard.id]}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <UserComp />
    </>
  );
}

export default App;
