import { useState } from "react";
import { logout, resetScores, setGameStarted } from "actions";
import { connect } from "react-redux";
import { AiOutlineHome } from "react-icons/ai";
import { MdLeaderboard } from "react-icons/md";
import Modal from "./Modal";


const Navbar = (props: any) => {
  const { playerName, movesLeft, logout, isGameStarted, setGameStarted, resetScores } = props;
  const [openModal, setOpenModal] = useState(false)
  return (
    <div className=" w-full px-5 h-10">
      {playerName && (
        <div className="flex h-full justify-between items-center">
          <div className="flex items-center h-full">
            <button onClick={() => {
              setGameStarted(false)
              resetScores()
            }} className="mr-2 outline-none border-none">
              <AiOutlineHome color='#fff' size={22} />
            </button>
            <h2 className="text-gray-300 text-xl">Welcome, {playerName}</h2>
          </div>

          {isGameStarted && <p className="text-gray-300 text-sm ">
            You have {movesLeft} moves left
          </p>}
          <div className="flex items-center h-full">
            <button
              onClick={() => setOpenModal(true)}
              className="text-white mr-4 outline-none border-none flex"
            >
              <span className="mr-2">
                Leaderboard
              </span>
              <MdLeaderboard color='#fff' size={22} />
            </button>
            <button
              onClick={logout}
              className="text-sm bg-red-400 hover:bg-red-500 tracking-wide text-white font-medium py-1 px-4 rounded-md outline-none border-none"
            >
              Exit
            </button>
          </div>
        </div>
      )}
      {openModal && <Modal open onClose={() => setOpenModal(false)} />}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { gameReducer } = state;

  return gameReducer;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: () => dispatch(logout()),
    setGameStarted: (isStarted: boolean) => dispatch(setGameStarted(isStarted)),
    resetScores: () => dispatch(resetScores())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
