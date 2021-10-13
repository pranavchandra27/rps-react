import { useState } from "react";
import { logout, resetScores, setGameStarted } from "actions";
import { connect } from "react-redux";
import { AiOutlineHome } from "react-icons/ai";
import { MdLeaderboard, MdExitToApp } from "react-icons/md";
import Modal from "./Modal";


const Navbar = (props: any) => {
  const { playerName, movesLeft, logout, isGameStarted, setGameStarted, resetScores } = props;
  const [openModal, setOpenModal] = useState(false)
  return (
    <div className="w-full px-5 h-16 sm:h-12">
      {playerName && (
        <div className="flex flex-col justify-center h-full">

          <div className="flex h-full justify-between items-center">
            <div className="flex items-center h-full">
              <button onClick={() => {
                setGameStarted(false)
                resetScores()
              }} className="mr-2 outline-none border-none">
                <AiOutlineHome color='#fff' size={22} />
              </button>
              <h2 className="text-gray-300 text-lg sm:text-xl">Welcome, {playerName}</h2>
            </div>

            {isGameStarted && <p className="hidden sm:block text-gray-300 text-sm ">
              You have {movesLeft} moves left
            </p>}
            <div className="flex items-center h-full">
              <button
                onClick={() => setOpenModal(true)}
                className="flex text-white mr-4 outline-none border-none"
              >
                <span className="mr-2 sm:block hidden">
                  Leaderboard
                </span>
                <MdLeaderboard color='#fff' size={22} />
              </button>
              <button
                onClick={logout}
                className="text-sm bg-transparent sm:bg-red-400 sm:hover:bg-red-500 tracking-wide text-white font-medium p-0 sm:py-1 sm:px-4 rounded-md outline-none border-none"
              >
                <span className="hidden sm:block">Exit</span>
                <span className="block sm:hidden">
                  <MdExitToApp color='#fff' size={22} />
                </span>
              </button>
            </div>
          </div>
          <div className="sm:hidden block text-center">
            {isGameStarted && <p className="text-gray-300 text-sm ">
              You have {movesLeft} moves left
            </p>}
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
