import { FC, useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

interface ModalProps {
  open: boolean;
  onClose: VoidFunction;
}

const Modal: FC<ModalProps> = (props) => {
  const { open, onClose } = props;
  const [users, setUsers] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:5000/user`);
        let users = await res.json();
        users = users.sort((a: any, b: any) => b.score - a.score)
        setUsers(users);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="modal" style={{ display: open ? "block" : "none" }}>
      {/*  Modal content */}
      <div className="overlay" onClick={onClose}></div>

      <div className="relative w-96 h-96 m-auto mt-20 bg-gray-50 rounded-md">
        <div className="flex justify-between items-center pl-3.5">
          <h2 className="uppercase tracking-wide font-bold">Leaderboard</h2>
          <button onClick={onClose}>
            <IoIosClose className="text-gray-700" size={40} />
          </button>
        </div>

        <div className="px-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Username</h3>
            <h3 className="text-lg font-medium">Score</h3>
          </div>
          {users.map((user: any) => (
            <div className="flex justify-between" key={user._id}>
              <h3 className="text-lg">{user.username}</h3>
              <h3 className="text-lg">{user.score}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
