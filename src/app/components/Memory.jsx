'use client'

import { useState, useEffect } from 'react';
import styles from '../styles/home.module.css';

const ExoJulesMemory = () => {
  const [isWin, setIsWin] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isFinish, setIsFinish] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [resultat, setResultat] = useState('');
  const [deck2, setDeck2] = useState([]);
  const [counter, setCounter] = useState(0);

  const initialDeck = [
    { id: 0, symbol: '🍍', show: false, win: false },
    { id: 1, symbol: '🥥', show: false, win: false },
    { id: 2, symbol: '🍍', show: false, win: false },
    { id: 3, symbol: '🥥', show: false, win: false },
    { id: 4, symbol: '🍎', show: false, win: false },
    { id: 5, symbol: '🥝', show: false, win: false },
    { id: 6, symbol: '🍎', show: false, win: false },
    { id: 7, symbol: '🥝', show: false, win: false },
    { id: 8, symbol: '🍗', show: false, win: false },
    { id: 9, symbol: '🍗', show: false, win: false },
    { id: 10, symbol: '🥬', show: false, win: false },
    { id: 11, symbol: '🥬', show: false, win: false },
    { id: 12, symbol: '🍋', show: false, win: false },
    { id: 13, symbol: '🍋', show: false, win: false },
    { id: 14, symbol: '🍊', show: false, win: false },
    { id: 15, symbol: '🍊', show: false, win: false },
  ];

  useEffect(() => {
    randomCard();
  }, []);

  const randomCard = () => {
    let deck = [...initialDeck];
    let deck2 = [];
    while (deck.length > 0) {
      const selectedIndex = Math.floor(Math.random() * deck.length);
      let card = deck[selectedIndex];
      card.id = deck2.length;
      deck2.push(card);
      deck.splice(selectedIndex, 1);
    }
    setDeck2(deck2);
  };

  const cardTrue = (card, symbol, index) => {
    if (card.win === false) {
      let newDeck = [...deck2];
      newDeck[index].show = true;
      setDeck2(newDeck);

      if (selectedCard === null) {
        setSelectedCard(card);
      } else {
        if (selectedCard.symbol === symbol && selectedCard.id !== card.id) {
          setCounter(counter + 2);
          if (counter + 2 === deck2.length) {
            setResultat('Congratulations !');
          } else {
            setResultat('Very good');
          }
          let updatedDeck = [...deck2];
          updatedDeck[index].win = true;
          updatedDeck[selectedCard.id].win = true;
          setDeck2(updatedDeck);

          setTimeout(() => {
            setSelectedCard(null);
          }, 1000);
        } else {
          setResultat('Try again');
          setTimeout(() => {
            let updatedDeck = [...deck2];
            updatedDeck[index].show = false;
            updatedDeck[selectedCard.id].show = false;
            setDeck2(updatedDeck);
            setSelectedCard(null);
          }, 1000);
        }
      }
    }
  };

  return (
    <div className={styles.cardCtn}>
      <div className={styles.title}>Memory Game</div>
      <div className={styles.scoreHeader}>
        <div className={styles.value}>{resultat}</div>
        <div className={styles.counter}>{counter}</div>
      </div>
      {deck2.length > 0 ? (
        <div className={styles.border}>
          {deck2.map((card, index) => (
            <div
              key={index}
              className={`${styles.card} ${card.show ? styles.active : ''}`}
              onClick={() => cardTrue(card, card.symbol, index)}
            >
              <div className={`${styles.cardBack} ${card.win ? styles.win : ''}`}>
                <span>{card.symbol}</span>
              </div>
              <div className={`${styles.cardFront} ${card.show ? styles.turnCard : ''}`}>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.afterWin}>Salut</div>
      )}
    </div>
  );
};

export default ExoJulesMemory;
