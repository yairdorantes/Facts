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
import bg from "./media/wall3.jpg";
import { useBearStore } from "./context/GlobalContext";
import Loader from "./components/Loader";

function App() {
  const { user } = useContext(AuthContext);
  const { handleReactionVisibility } = useBearStore();
  const [userData, setUserData] = useState([]);
  const [fromWhere, setFromWhere] = useState(0);
  const [initialStep] = useState(10);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dataCards, setDataCards] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const getFacts = (step) => {
    setLoading(true);
    axios
      .get(`${api}/facts/${fromWhere}/${step}`)
      .then((res) => {
        setDataCards((dataCards) => dataCards.concat(res.data.facts));
        console.log(res.data.facts);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getFacts(initialStep);
    getUserData();
  }, []);
  useEffect(() => {
    setFromWhere(fromWhere + initialStep);
    getFacts(fromWhere);
  }, [activeIndex]);

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center "
        style={{
          backgroundImage: `linear-gradient(rgba(4, 4, 4, 0.696), rgba(12, 12, 12, 0.77)), url(${bg})`,
        }}
      >
        {/* {!loading && dataCards.length === 0 && (
          <div className="fixed z-10 alert max-w-lg  -translate-x-1/2 mt-10 left-1/2">
            Nada por aquí...
          </div>
        )} */}
        {loading && (
          <div className="fixed z-10 -translate-x-1/2 mt-10 left-1/2">
            <Loader />
          </div>
        )}
        <div className="absolute inset-0 backdrop-filter backdrop-blur" />
        <div
          onClick={(e) => {
            !e.target.getAttribute("data-reaction") &&
              handleReactionVisibility(false);
          }}
        >
          <Swiper
            direction={"vertical"}
            pagination={{
              clickable: true,
            }}
            className="h-screen"
            keyboard={true}
            modules={[Keyboard, Mousewheel]}
            mousewheel={true}
            onActiveIndexChange={(e) => {
              if ((e.activeIndex + 1) % initialStep === 0)
                setActiveIndex(e.activeIndex + 1);
            }}
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
      </div>
      <UserComp />
    </>
  );
}

export default App;
