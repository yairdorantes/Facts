import { useState } from "react";
import CommentsSec from "./CommentsSec";
import { useContext } from "react";
import AuthContext from "./UserContext";

const Comments = ({ fact }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { user, setIsOpen } = useContext(AuthContext);
  return (
    <div className="flex flex-col">
      <button
        className="btn btn-circle flex flex-row"
        onClick={() => {
          user ? setIsVisible(!isVisible) : setIsOpen(true);
        }}
      >
        <svg
          className="w-7 h-7 text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
          height="1em"
          width="1em"
        >
          <path d="M7 7h10v2H7zm0 4h7v2H7z" />
          <path d="M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H6.667L4 18V4h16v12z" />
        </svg>
      </button>
      <div className="text-center font-bold text-sm">{fact.total_comments}</div>
      {isVisible && (
        <CommentsSec
          isVisible={isVisible}
          fact={fact}
          setIsvisible={setIsVisible}
        />
      )}
    </div>
  );
};

export default Comments;
