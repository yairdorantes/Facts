import { useContext, useState } from "react";
import AuthContext from "./UserContext";
import Modal from "react-modal";
import OutsideClickHandler from "react-outside-click-handler";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    outline: "none",
    backgroundColor: "#141212",
  },
  overlay: { zIndex: 999, backgroundColor: "#18191ab1" },
};
const UserComp = () => {
  const [username, setUsername] = useState("");
  const { loginUser, isOpen, setIsOpen } = useContext(AuthContext);
  const handleSubmit = () => loginUser(username);

  return (
    <Modal isOpen={isOpen} style={customStyles} ariaHideApp={false}>
      <OutsideClickHandler
        onOutsideClick={() => {
          console.log("jajaj");
          setIsOpen(false);
        }}
      >
        <h3 className="text-white mb-2 font-bold">Ingresa tu nickname: </h3>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className="input"
          placeholder="User001"
        />
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="btn mt-3 mx-auto btn-success"
          >
            Ingresar
          </button>
        </div>
      </OutsideClickHandler>
    </Modal>
  );
};

export default UserComp;
