import HandPicker from "components/HandPicker";
import ScoreCard from "components/ScoreCard";
import StartGame from "components/StartGame";
import { connect } from "react-redux";
import { StatePropTypes } from "reducers/gameReducer";

const Game = ({ isGameStarted }: any) => {
	return (
		<>
			{isGameStarted ? (
				<>
					<ScoreCard />
					<HandPicker />
				</>
			) : (
				<StartGame />
			)}

		</>
	);
};

const mapStateToProps = (state: any) => {
	const { gameReducer } = state;
	const { isGameStarted }: StatePropTypes = gameReducer;
	return {
		isGameStarted,
	};
};

export default connect(mapStateToProps, null)(Game);
