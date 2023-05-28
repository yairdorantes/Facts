import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
// import OutsideClickHandler from "react-outside-click-handler";
import AuthContext from "./UserContext";
import axios from "axios";
import { api } from "../api";
import Loader from "./Loader";

const customStyles = {
  content: {
    height: "88%",
    outline: "none",
    backgroundColor: "#1412125b",
    overflowY: "auto",
    position: "relative",
    border: "1px solid rgba(255, 255, 255, 0.300)",
    borderRadius: "10px",
    marginTop: "10px",
  },
  overlay: { zIndex: 999, backgroundColor: "#18191a93" },
};

const CommentsSec = ({ isVisible, setIsvisible, fact }) => {
  const { user } = useContext(AuthContext);
  const [comms, setComms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const getComments = () => {
    setIsLoading(true);
    axios
      .get(`${api}/comms/${fact.id}`)
      .then((res) => {
        console.log(res.data.comments);
        setComms(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const sendComment = (e) => {
    e.preventDefault();
    if (commentContent.length > 0 && commentContent.length < 777) {
      setComms([
        { description: commentContent, user__username: user },
        ...comms,
      ]);
      setCommentContent("");
      axios
        .post(`${api}/comms/${fact.id}/${user}`, { text: commentContent })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getComments();
  }, []);
  return (
    <Modal
      className="h-screen  md:w-1/2 lg:w-1/4 mx-auto"
      isOpen={isVisible}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="fixed z-10 right-0 md:right-1/4 lg:left-2/3">
        <button
          className="bg-gray-700 rounded-full p-2 mt-1 mr-2"
          onClick={() => setIsvisible(false)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            viewBox="0 0 15 15"
            height="3em"
            width="3em"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M12.854 2.854a.5.5 0 00-.708-.708L7.5 6.793 2.854 2.146a.5.5 0 10-.708.708L6.793 7.5l-4.647 4.646a.5.5 0 00.708.708L7.5 8.207l4.646 4.647a.5.5 0 00.708-.708L8.207 7.5l4.647-4.646z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {!isLoading ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              transformOrigin: "top",
              overflow: "hidden",
              // height: "100%",
            }}
          >
            <div className="text-white bg-transparent">
              <div className=" container mx-auto p-4">
                {/* <OutsideClickHandler
                onOutsideClick={() => console.log("jaja xd")}
              > */}
                <div className="relative overflow-y-auto flex flex-col space-y-4">
                  {comms.map((comm, i) => (
                    <div key={i} className="bg-gray-800 p-4 shadow rounded-lg ">
                      <div className="flex space-x-4">
                        {/* <img alt="User Avatar" className="w-12 h-12 rounded-full"/> */}
                        <div className="flex-grow">
                          <h4 className="text-lg font-semibold">
                            {comm.user__username}
                          </h4>
                          {/* <p className="text-gray-500 text-sm">
                              Posted on May 27, 2023
                            </p> */}
                        </div>
                      </div>
                      <p className="mt-1">{comm.description}</p>
                    </div>
                  ))}
                </div>
                {/* </OutsideClickHandler> */}
              </div>
            </div>
          </motion.div>
        ) : (
          <Loader
            styles={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>

      <div className="mt-10 bottom-3 fixed w-full md:w-1/2 lg:w-1/4 left-1/2 -translate-x-1/2">
        <form
          className="w-full flex justify-center gap-2"
          onSubmit={(e) => sendComment(e)}
        >
          <input
            type="text"
            placeholder={`comentar como: ${user}`}
            className="input w-3/4"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <button type="submit" className="btn btn-secondary">
            <svg
              fill="none"
              viewBox="0 0 15 15"
              height="1em"
              width="1em"
              className="w-6 h-6 text-white"
            >
              <path
                fill="currentColor"
                d="M14.954.71a.5.5 0 01-.1.144L5.4 10.306l2.67 4.451a.5.5 0 00.889-.06L14.954.71zM4.694 9.6L.243 6.928a.5.5 0 01.06-.889L14.293.045a.5.5 0 00-.146.101L4.694 9.6z"
              />
            </svg>
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CommentsSec;
