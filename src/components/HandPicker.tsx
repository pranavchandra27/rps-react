import { useCallback, useEffect, useState, useRef } from "react";
import BgTriangle from "assets/bg-triangle.svg";
import paperImage from "assets/icon-paper.svg";
import rockImage from "assets/icon-rock.svg";
import scissorsImage from "assets/icon-scissors.svg";
import {
  resetScores,
  updateMoves,
  updatePlayerScore,
  updateComputerScore,
  setGameStarted,
} from "actions";
import { connect } from "react-redux";
import { setUserData } from "actions/userActions";

const ROCK = "rock",
  PAPER = "paper",
  SCISSORS = "scissors";
const choices = ["rock", "paper", "scissors"];
// const winnerChoices = { PLAYER: "You", COMPUTER: "Computer", NONE: "No one" };

const HandPicker = (props: any) => {
  const {
    playerName,
    updateMoves,
    movesLeft,
    updatePlayerScore,
    updateComputerScore,
    playerScore,
    computerScore,
    resetGame,
    setGameStarted,
    user,
    setUserData,
  } = props;
  const [playerHand, setPlayerHand] = useState("");
  const [computerHand, setComputerHand] = useState("");
  const [winner, setWinner] = useState<any>(null);
  const [hasTimerStarted, setTimerStarted] = useState(false);
  const [isGameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(0);
  const initialRender = useRef(true);

  const pickPlayerHand = (playerChoice: string) => {
    setPlayerHand(playerChoice);
    computerPick(playerChoice);
    setTimer(3);
    setWinner(null);
  };

  const updateMove = () => {
    let moves = movesLeft - 1;
    updateMoves(moves);
  };

  const computerPick = (playerChoice: string) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    setTimerStarted(true);
    setTimeout(() => {
      setTimerStarted(false);
      setComputerHand(computerChoice);
      const whoWon = determinWinner(playerChoice, computerChoice);

      if (whoWon === "PLAYER") {
        updatePlayerScore(playerScore + 1);
      }

      if (whoWon === "COMPUTER") {
        updateComputerScore(computerScore + 1);
      }

      setWinner(whoWon);

      updateMove();
    }, 3000);
  };

  const countdownTimer = useCallback(() => {
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      setTimer(0);
    }
  }, [timer]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      countdownTimer();
    }
  }, [countdownTimer]);

  const determinWinner = (playerHand: string, computerHand: string) => {
    let winner = "";

    switch (playerHand) {
      case ROCK:
        switch (computerHand) {
          case ROCK:
            winner = "NONE";
            break;
          case PAPER:
            winner = "COMPUTER";
            break;
          case SCISSORS:
            winner = "PLAYER";
            break;
        }
        break;
      case PAPER:
        switch (computerHand) {
          case ROCK:
            winner = "PLAYER";
            break;
          case PAPER:
            winner = "NONE";
            break;
          case SCISSORS:
            winner = "COMPUTER";
            break;
          default:
            return;
        }
        break;
      case SCISSORS:
        switch (computerHand) {
          case ROCK:
            winner = "COMPUTER";
            break;
          case PAPER:
            winner = "PLAYER";
            break;
          case SCISSORS:
            winner = "NONE";
            break;
          default:
            return;
        }
        break;
      default:
        return;
    }

    return winner;
  };

  const resetOrReplay = () => {
    setPlayerHand("");
    setComputerHand("");
    setWinner("");
    setTimerStarted(false);
    setTimer(0);

    if (isGameOver) {
      setGameOver(false);
    }
  };

  useEffect(() => {
    if (movesLeft === 0) {
      setTimeout(() => {
        setGameOver(true);

        if (user) {
          let data: any = {};
          if (playerScore > computerScore) {
            data["won"] = user.won + 1;
          } else if (computerScore > playerScore) {
            data["lost"] = user.lost + 1;
          } else if (computerScore === playerScore) {
            data["draw"] = user.draw + 1
          }
          updateUserInfo(data);
        }
      }, 3000);
    }
    // eslint-disable-next-line
  }, [movesLeft]);

  const updateScore = useCallback(async () => {
    if (playerScore) {
      const data = {
        score: user?.score + 1,
      };

      try {
        const res = await fetch(`http://localhost:5000/user/${playerName}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const user = await res.json();
        setUserData(user);
      } catch (error) {
        console.log(error);
      }
    }
    // eslint-disable-next-line
  }, [playerScore]);

  useEffect(() => {
    if (!initialRender.current) {
      updateScore();
    }
    // eslint-disable-next-line
  }, [updateScore]);

  const updateUserInfo = async (data = {}) => {
    try {
      const res = await fetch(`http://localhost:5000/user/${playerName}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const user = await res.json();
      setUserData(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-20 w-full flex justify-center items-center">
      {isGameOver ? (
        <div className="text-center">
          <p className="text-xl text-gray-200 font-bold">
            {playerScore > computerScore
              ? "You won the game!"
              : computerScore > playerScore
                ? "You lost the game!"
                : computerScore === playerScore
                  ? "Game was draw!"
                  : ""}
          </p>
          <div className="mt-2">
            <button
              onClick={() => {
                resetGame();
                resetOrReplay();
                updateUserInfo({ gamePlayed: user?.gamePlayed + 1 })
              }}
              className="mr-2 text-md bg-green-500 text-white font-medium py-1.5 px-2.5 rounded-md outline-none border-none"
            >
              Restart
            </button>
            <button
              onClick={() => {
                resetGame();
                setGameStarted(false);
                updateUserInfo({ gamePlayed: user?.gamePlayed + 1 })
              }}
              className=" text-md bg-red-500 text-white font-medium py-1.5 px-2.5 rounded-md outline-none border-none"
            >
              Go Home
            </button>
          </div>
        </div>
      ) : !playerHand ? (
        <div>
          <div className="relative">
            <img src={BgTriangle} alt="triangle" />

            <button
              onClick={() => pickPlayerHand("paper")}
              className="transform motion-safe:hover:scale-110 absolute -top-14 -left-14 bg-gray-200 w-32 h-32 flex justify-center items-center rounded-full hand-border border-blue-500"
            >
              <img src={paperImage} alt="Paper" />
            </button>
            <button
              onClick={() => pickPlayerHand("scissors")}
              className="transform motion-safe:hover:scale-110 absolute -top-14 -right-14 bg-gray-200 w-32 h-32 flex justify-center items-center rounded-full hand-border border-yellow-500"
            >
              <img src={scissorsImage} alt="Scissors" />
            </button>
            <button
              onClick={() => pickPlayerHand("rock")}
              className="transform motion-safe:hover:scale-110 absolute -bottom-14 left-20 bg-gray-200 w-32 h-32 flex justify-center items-center rounded-full hand-border border-red-500"
            >
              <img src={rockImage} alt="Rock" />
            </button>
          </div>
          {/* <div className="text-center mt-20">
            <p className="text-xl text-gray-200 font-bold pulse-animation">
              Pick a hand
            </p>
          </div> */}
        </div>
      ) : (
        <div className="transition-all duration-300 ease-in-out flex items-center">
          <div
            className={`bg-gray-200 w-60 h-60 flex justify-center items-center rounded-full hand-border border-${playerHand === "paper"
              ? "blue"
              : playerHand === "scissors"
                ? "yellow"
                : "red"
              }-500`}
          >
            <img
              src={
                playerHand === "paper"
                  ? paperImage
                  : playerHand === "scissors"
                    ? scissorsImage
                    : rockImage
              }
              alt="Paper"
            />
          </div>
          <div className=" mx-10">
            {winner && (
              <div className="text-center">
                <p className="text-xl text-gray-200 font-bold">
                  {winner === "PLAYER"
                    ? "You won! 😀"
                    : winner === "COMPUTER"
                      ? "You lost! 😕"
                      : "Draw 😐"}
                </p>
                {movesLeft !== 0 && (
                  <button
                    onClick={resetOrReplay}
                    className="mt-2 text-md bg-blue-500 text-white font-medium py-1.5 px-2.5 rounded-md outline-none border-none"
                  >
                    Replay
                  </button>
                )}
              </div>
            )}
          </div>
          <div
            className={`bg-gray-200 w-60 h-60 flex justify-center items-center rounded-full hand-border border-${computerHand === "paper"
              ? "blue"
              : computerHand === "scissors"
                ? "yellow"
                : computerHand === "rock"
                  ? "red"
                  : "none"
              }-500`}
          >
            {hasTimerStarted ? (
              <p className="text-6xl text-gray-600 font-bold">{timer}</p>
            ) : (
              <img
                src={
                  computerHand === "paper"
                    ? paperImage
                    : computerHand === "scissors"
                      ? scissorsImage
                      : rockImage
                }
                alt="Paper"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { gameReducer, userReducer } = state;
  return { ...gameReducer, ...userReducer };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    resetGame: () => dispatch(resetScores()),
    updateMoves: (moves: number) => dispatch(updateMoves(moves)),
    updatePlayerScore: (score: number) => dispatch(updatePlayerScore(score)),
    updateComputerScore: (score: number) =>
      dispatch(updateComputerScore(score)),
    setGameStarted: (started: boolean) => dispatch(setGameStarted(started)),
    setUserData: (data: any) => dispatch(setUserData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandPicker);
