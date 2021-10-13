import { connect } from "react-redux";

const ScoreCard = ({ playerScore, computerScore }: any) => {
  return (
    <div className="score-card">
      <div className="border-2 border-white border-opacity-50 rounded-xl md:p-6 sm:p-4 p-4 sm:flex-row flex-col flex items-center justify-between">
        <div className="w-full">
          <p className="md:text-3xl sm:text-2xl sm:justify-center justify-between sm:mb-0 mb-5 text-xl flex sm:flex-col flex-row sm:leading-none md:leading-none font-medium text-gray-100 leading-none">
            <span>ROCK</span>
            <span>PAPER</span>
            <span>SCISSORS</span>
          </p>
        </div>

        <div className="flex justify-end w-full">
          <div className="md:w-32 sm:w-28 w-full bg-gray-200 rounded-md text-center p-2">
            <p className="text-blue-900 text-sm font-bold tracking-widest">
              YOU
            </p>
            <p className="md:text-6xl sm:text-5xl text-6xl text-gray-600 font-bold">{playerScore}</p>
          </div>
          <div className="md:w-32 sm:w-28 w-full ml-5 bg-gray-200 rounded-md text-center p-2">
            <p className="text-blue-900 text-sm font-bold tracking-widest">
              COMPUTER
            </p>
            <p className="md:text-6xl sm:text-5xl text-6xl text-gray-600 font-bold">{computerScore}</p>
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
