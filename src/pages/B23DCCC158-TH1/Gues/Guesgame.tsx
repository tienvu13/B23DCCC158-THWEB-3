import React, { useState } from 'react';
import { Card, Button, Input } from 'antd';

const GuessNumberGame: React.FC = () => {
  const [randomNumber, setRandomNumber] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(10);

  const handleGuess = () => {
    const num = parseInt(guess, 10);
    if (isNaN(num) || num < 1 || num > 100) {
      setMessage('Vui lòng nhập số từ 1 đến 100!');
      return;
    }

    if (num === randomNumber) {
      setMessage('🎉 Chúc mừng! Bạn đã đoán đúng!');
    } else if (num < randomNumber) {
      setMessage('📉 Bạn đoán quá thấp!');
    } else {
      setMessage('📈 Bạn đoán quá cao!');
    }

    setAttempts(attempts - 1);

    if (attempts - 1 === 0 && num !== randomNumber) {
      setMessage(`😢 Bạn đã hết lượt! Số đúng là ${randomNumber}.`);
    }
  };

  const resetGame = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('');
    setAttempts(10);
  };

  return (
    <Card style={{ maxWidth: 400, margin: '20px auto', textAlign: 'center' }}>
      <h2>👑 Trò chơi đoán số</h2>
      <p>Nhập số từ 1 đến 100</p>
      <Input 
        type="number" 
        value={guess} 
        onChange={(e) => setGuess(e.target.value)} 
        style={{ marginBottom: 10 }}
      />
      <Button type="primary" onClick={handleGuess} disabled={attempts === 0}>
        Đoán
      </Button>
      <p style={{ marginTop: 10 }}>{message}</p>
      <p>Còn {attempts} lượt</p>
      <Button type="dashed" onClick={resetGame} style={{ marginTop: 10 }}>
        Chơi lại
      </Button>
    </Card>
  );
};

export default GuessNumberGame;
