import React, { useState } from 'react';
import './RockPaperScissor.css';

const choices: string[] = ['✌️', '✊', '🖐️'];

type GameResult = 'Hòa' | 'Người chơi thắng' | 'Máy thắng';

type GameHistory = {
  id: string;
  player: string;
  computer: string;
  result: GameResult;
};

const getComputerChoice = (): string => {
  return choices[Math.floor(Math.random() * choices.length)];
};

const determineWinner = (player: string, computer: string): GameResult => {
  if (player === computer) return 'Hòa';
  if (
    (player === '✌️' && computer === '🖐️') ||
    (player === '✊' && computer === '✌️') ||
    (player === '🖐️' && computer === '✊')
  ) {
    return 'Người chơi thắng';
  }
  return 'Máy thắng';
};

const RockPaperScissors: React.FC = () => {
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [computerChoice, setComputerChoice] = useState<string | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);

  const playGame = (choice: string) => {
    const computer = getComputerChoice();
    const gameResult = determineWinner(choice, computer);
    
    setPlayerChoice(choice);
    setComputerChoice(computer);
    setResult(gameResult);
    setGameHistory([...gameHistory, { id: crypto.randomUUID(), player: choice, computer, result: gameResult }]);
  };

  return (
    <div className="game-container">
      <h1 className="title">Oẳn Tù Tì ✌️✊🖐️</h1>
      <div className="button-container">
        {choices.map((choice) => (
          <button
            key={choice}
            className="choice-button"
            onClick={() => playGame(choice)}
          >
            {choice}
          </button>
        ))}
      </div>
      {playerChoice && (
        <div className="result-box">
          <p className="player-choice">Người chơi chọn: {playerChoice}</p>
          <p className="computer-choice">Máy tính chọn: {computerChoice}</p>
          <p className="result-text">Kết quả: {result}</p>
        </div>
      )}
      <h2 className="history-title">Lịch sử trận đấu</h2>
      <ul className="history-box">
        {gameHistory.map((round, index) => (
          <li key={round.id} className="history-item">
            {`Ván ${index + 1}: Người chơi (${round.player}) - Máy (${round.computer}) => `}
            <span className="history-result">{round.result}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RockPaperScissors;
