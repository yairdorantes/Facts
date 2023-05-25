import { useLongPress } from "use-long-press";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import AuthContext from "./UserContext";
import axios from "axios";
import { api } from "../api";

const reactIcons = [
  <svg
    key={1}
    className="w-7 h-7 text-cyan-300 "
    viewBox="0 0 24 24"
    fill="currentColor"
    height="1em"
    width="1em"
  >
    <path d="M4 21h1V8H4a2 2 0 00-2 2v9a2 2 0 002 2zM20 8h-7l1.122-3.368A2 2 0 0012.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 00-2-2z" />
  </svg>,
  <svg
    key={2}
    className="w-7 h-7 text-yellow-200"
    viewBox="0 0 512 512"
    fill="currentColor"
    height="1em"
    width="1em"
  >
    <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0 0 114.6 0 256s114.6 256 256 256zM101.6 314c-3.7-13.7 7.5-26 21.7-26h265.4c14.2 0 25.4 12.3 21.7 26C392 382 329.8 432 256 432s-136-50-154.4-118zm116-101.2l-.2-.2c-.2-.2-.4-.5-.7-.9-.6-.8-1.6-2-2.8-3.4-2.5-2.8-6-6.6-10.2-10.3-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3-1.2 1.4-2.2 2.6-2.8 3.4-.3.4-.6.7-.7.9l-.2.2c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8 9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8 0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8zm160 0l-.2-.2c-.2-.2-.4-.5-.7-.9-.6-.8-1.6-2-2.8-3.4-2.5-2.8-6-6.6-10.2-10.3-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3-1.2 1.4-2.2 2.6-2.8 3.4-.3.4-.6.7-.7.9l-.2.2c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8 9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8 0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8z" />
  </svg>,
  <svg
    key={3}
    className="w-8 h-8 text-red-400"
    viewBox="0 0 1024 1024"
    fill="currentColor"
    height="1em"
    width="1em"
  >
    <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" />
  </svg>,
  <svg
    key={4}
    viewBox="0 0 512 512"
    fill="currentColor"
    height="1em"
    width="1em"
    className="w-7 h-7  text-yellow-300"
  >
    <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0 0 114.6 0 256s114.6 256 256 256zm-79.6-272c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm192-32c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zM256 416c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z" />
  </svg>,
  <svg
    key={5}
    viewBox="0 0 512 512"
    fill="currentColor"
    height="1em"
    width="1em"
    className="w-7 h-7 text-blue-500"
  >
    <path d="M352 493.4c-29.6 12-62.1 18.6-96 18.6s-66.4-6.6-96-18.6V288c0-8.8-7.2-16-16-16s-16 7.2-16 16v189.8C51.5 433.5 0 350.8 0 256 0 114.6 114.6 0 256 0s256 114.6 256 256c0 94.8-51.5 177.5-128 221.8V288c0-8.8-7.2-16-16-16s-16 7.2-16 16v205.4zM195.2 233.6c5.3 7.1 15.3 8.5 22.4 3.2s8.5-15.3 3.2-22.4c-30.4-40.5-91.2-40.5-121.6 0-5.3 7.1-3.9 17.1 3.2 22.4s17.1 3.9 22.4-3.2c17.6-23.5 52.8-23.5 70.4 0zm121.6 0c17.6-23.5 52.8-23.5 70.4 0 5.3 7.1 15.3 8.5 22.4 3.2s8.5-15.3 3.2-22.4c-30.4-40.5-91.2-40.5-121.6 0-5.3 7.1-3.9 17.1 3.2 22.4s17.1 3.9 22.4-3.2zM208 336v32c0 26.5 21.5 48 48 48s48-21.5 48-48v-32c0-26.5-21.5-48-48-48s-48 21.5-48 48z" />
  </svg>,

  <svg
    key={6}
    className="w-8 h-8 text-red-500"
    viewBox="0 0 24 24"
    fill="currentColor"
    height="1em"
    width="1em"
  >
    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-5 8.5l.002-.022-1.373-.549.742-1.857 5 2-.742 1.857-1.031-.413c-.014.014-.023.031-.037.044A1.499 1.499 0 017 10.5zM8 17s1-3 4-3 4 3 4 3H8zm8.986-6.507c0 .412-.167.785-.438 1.056a1.488 1.488 0 01-2.112 0c-.011-.011-.019-.024-.029-.035l-1.037.415-.742-1.857 5-2 .742 1.857-1.386.554a.036.036 0 01.002.01z" />
  </svg>,
];
const variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
    },
  }),
};

const Reaction = ({ fact, reaction }) => {
  const [visibleReacts, setVisibleReacts] = useState(false);
  const [btnIcon, setBtnIcon] = useState(reactIcons[reaction]);
  const { user, setIsOpen } = useContext(AuthContext);
  const bind = useLongPress(
    () => {
      setVisibleReacts(!visibleReacts);
    },
    {
      onCancel: () => {
        console.log("xd");
        setBtnIcon(undefined);
      },
    }
  );
  const handleIconClick = (key) => {
    setBtnIcon(reactIcons[key]);
    setVisibleReacts(false);
    axios
      .put(`${api}/user/${user}`, { post_id: fact.id, reaction: key })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <OutsideClickHandler
        onOutsideClick={() => {
          visibleReacts && setVisibleReacts(false);
        }}
      >
        <div className="absolute -top-14">
          <AnimatePresence>
            {visibleReacts && (
              <div className="flex gap-4 bg-black items-center p-2 rounded-3xl ">
                {reactIcons.map((icon, key) => (
                  <motion.div
                    key={key}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    custom={key + 1}
                    //   exit={{ opacity: 0 }}
                  >
                    <div
                      className="cursor-pointer "
                      onClick={() => handleIconClick(key)}
                    >
                      {icon}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
        {user && btnIcon ? (
          <button {...bind()} className="btn flex flex-col">
            {btnIcon}
          </button>
        ) : (
          <button
            onClick={() => !user && setIsOpen(true)}
            {...bind()}
            className="btn float-left flex flex-col"
          >
            <svg
              key={1}
              className="w-7 h-7 text-gray-300"
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path d="M4 21h1V8H4a2 2 0 00-2 2v9a2 2 0 002 2zM20 8h-7l1.122-3.368A2 2 0 0012.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 00-2-2z" />
            </svg>
          </button>
        )}
      </OutsideClickHandler>
    </>
  );
};

export default Reaction;
