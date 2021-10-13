import Login from "pages/Login";
import Navbar from "components/Navbar";
import { connect } from "react-redux";
import Game from "pages/Game";

const App = (props: any) => {
  const { playerName } = props;

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto h-full">
        {playerName ? <Game /> : <Login />}
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  const { gameReducer } = state;
  return {
    playerName: gameReducer.playerName,
  };
};

export default connect(mapStateToProps, null)(App);
