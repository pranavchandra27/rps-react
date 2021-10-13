import { connect } from "react-redux";

const ScoreCard = ({ playerScore, computerScore }: any) => {
  return (
    <div>
      <div className="mt-5 border-2 border-white border-opacity-50 rounded-xl p-6 flex items-center justify-between">
        <div>
          <p className="text-3xl font-medium text-gray-100 leading-none ">
            <span>ROCK</span>
            <br />
            <span>PAPER</span>
            <br />
            <span>SCISSORS</span>
          </p>
        </div>

        <div className="flex">
          <div className="w-32 bg-gray-200 rounded-md text-center p-2">
            <p className="text-blue-900 text-sm font-bold tracking-widest">
              YOU
            </p>
            <p className="text-6xl text-gray-600 font-bold">{playerScore}</p>
          </div>
          <div className="w-32 ml-5 bg-gray-200 rounded-md text-center p-2">
            <p className="text-blue-900 text-sm font-bold tracking-widest">
              COMPUTER
            </p>
            <p className="text-6xl text-gray-600 font-bold">{computerScore}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { gameReducer } = state;

  return gameReducer;
};

export default connect(mapStateToProps, null)(ScoreCard);
