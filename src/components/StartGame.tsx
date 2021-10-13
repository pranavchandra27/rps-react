import { setGameStarted } from "actions";
import { connect } from "react-redux";

const StartGame = ({ setGameStarted, user }: any) => {
  return (
    <div className="text-center mt-10">

      <div className="border-2 border-white border-opacity-50 rounded-xl p-6 w-max mx-auto mb-10">
        <h1 className="text-gray-200">Score: {user?.score}</h1>
        <h1 className="text-gray-200">Games Played: {user?.gamePlayed}</h1>
        <h1 className="text-gray-200">Won: {user?.won}</h1>
        <h1 className="text-gray-200">Lost: {user?.lost}</h1>
        <h1 className="text-gray-200">Draw: {user?.draw}</h1>
      </div>

      <h2 className="text-4xl text-gray-100">Start the game</h2>
      <button
        onClick={() => setGameStarted(true)}
        className="mt-5 text-lg bg-blue-500 text-white font-medium py-1.5 px-5 uppercase tracking-wider rounded-md outline-none border-none"
      >
        Start
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setGameStarted: (isStarted: boolean) => {
      dispatch(setGameStarted(isStarted));
    },
  };
};

const mapStateToProps = (state: any) => {
  const { userReducer } = state
  return userReducer

};

export default connect(mapStateToProps, mapDispatchToProps)(StartGame);
