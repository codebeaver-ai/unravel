import React, { useEffect, useState } from "react";
import "./styles.scss";

import questionsData from "../../data/questions.json";
import tunasData from "../../data/tunas.json";
import firstDateData from "../../data/firstDate.json";
import advancedDating from "../../data/advancedDating.json";
import spicyData from "../../data/spicy.json";
import aftercareData from "../../data/aftercare.json";
import polyamoryData from "../../data/polyamory.json";
import silly from '../../data/silly.json';
import neurospicy from '../../data/neurospicy.json';
import queer from '../../data/queer.json';
import hedonisticData from '../../data/hedonist.json';
import flintaData from '../../data/flinta.json';
import bairroData from '../../data/bairro.json';
import QuestionsMode from "./components/QuestionsMode";

// add tests here

const availableModes = [
  {
    title: 'Play Unravel',
    description: 'Unravel. A series of questions designed to help you make new friends and develop better connections.',
    data: questionsData,
    tagType: ""
  },
  {
    title: 'Play First Date pack',
    description: ' A series of questions designed to deepen your bond and create meaningful conversations with your date.',
    data: firstDateData,
    tagType: ""
  },
  {
    title: 'Play Beyond the Surface',
    description: 'Take your romance to the next level through heartfelt inquiries that reveal genuine affection and understanding.',
    data: advancedDating,
    tagType: ""
  },
  {
    title: "Mingling at Bairro Alto",
    description: "Engage in fun conversations when meeting cool individuals in Bairro Alto, Lisbon.",
    data: bairroData,
    tagType: "new"
  },
  {
    title: 'Play Flames of Desire',
    description: 'Experience intense connections with daring questions, igniting desires and deepening bonds.',
    data: spicyData,
    tagType: ""
  },
  {
    title: 'Play Aftercare Glow',
    description: 'A set of thoughtful questions designed to enhance connection and nurture emotional well-being after your intimate moments.',
    data: aftercareData,
    tagType: "new"
  },
  {
    title: 'Play Hedonistic Societies pack',
    description: 'Dive into the world of hedonistic pleasures, where every conversation unveils provocative insights and shared indulgences deepen connections.',
    data: hedonisticData,
    tagType: ""
  },
  {
    title: 'Play Polyamorous Passions',
    description: ' Embrace boundless love and explore the dynamics of polyamory in this captivating game mode.',
    data: polyamoryData,
    tagType: ""
  },
  {
    title: 'Silly Goose Pack',
    description: 'Unleash laughter and fun with whimsical questions that promise lighthearted moments and quirky connections.',
    data: silly,
    tagType: "beta"
  },
  {
    title: 'Neurospicy Delight',
    description: ' Explore the magic of neurodiversity with a collection of whimsical and inclusive questions designed to foster laughter, connection, and understanding among individuals with diverse minds.',
    data: neurospicy,
    tagType: "beta"
  },
  {
    title: "Play FLINTA* Harmony",
    description: "Engage in deep and meaningful conversations that celebrate and explore the diverse experiences of FLINTA* individuals.",
    data: flintaData,
    tagType: "new"
  },
  {
    title: 'Queer Vibes',
    description: ' A vibrant set of casual questions for lighthearted and engaging LGBTQ+ conversations.',
    data: queer,
    tagType: "beta"
  },
  {
    title: 'Play Portuguese tunas pack',
    description: ' A series of questions that highlight the academic spirit of each Tuna and the great moments and adventures that come from being part of one.',
    data: tunasData,
    tagType: ""
  },
]

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [endOfQuestions, setEndOfQuestions] = useState(true);
  const [questionsCounter, setQuestionsCounter] = useState(0);
  const [doesPreviousSessionExist, setDoesPreviousSessionExist] = useState(false);

  const saveStateToLocalStorage = (mode, counter) => {
    localStorage.setItem('mode', JSON.stringify(mode));
    localStorage.setItem('questionsCounter', JSON.stringify(counter));
  };

  const handleIncrement = () => {
    if (questionsCounter >= questions.length - 1) {
      setEndOfQuestions(true);
      saveStateToLocalStorage([], 0);
      return;
    }

    setQuestionsCounter((previousValue) => {
      const newCounterValue = previousValue + 1;
      saveStateToLocalStorage(questions, newCounterValue);
      return newCounterValue;
    });
  };

  const resetQuestions = () => {
    setEndOfQuestions(false);
    setQuestionsCounter(0);
    saveStateToLocalStorage([], 0);
  };

  const switchToMode = (modeData) => {
    resetQuestions();
    setQuestions(modeData);
    saveStateToLocalStorage(modeData, 0);
  };

  const resumeGame = () => {
    const savedMode = JSON.parse(localStorage.getItem('mode'));
    const savedCounter = JSON.parse(localStorage.getItem('questionsCounter'));

    if (savedMode && typeof savedCounter === 'number') {
      setQuestions(savedMode);
      setQuestionsCounter(savedCounter);
      setEndOfQuestions(savedCounter > savedMode.length - 1);
    }
  };

  useEffect(() => {
    const savedMode = localStorage.getItem('mode');
    const savedCounter = localStorage.getItem('questionsCounter');
    setDoesPreviousSessionExist(savedMode !== null && savedCounter !== null)
    setQuestions(questionsData);
  }, []);

  return (
    <div className="questions">
      {!endOfQuestions ? (
        <div className="questionsContainer">
          <div className="header">
            <hr />
            <h2>
              <span className="counterNumber" key={questionsCounter}>
                {questionsCounter + 1}
              </span>{" "}
              / {questions.length}
            </h2>{" "}
            <hr />
          </div>
          <p className="questionsDisplay" key={questionsCounter}>
            {questions[questionsCounter]}
          </p>
          <button onClick={handleIncrement}>{questionsCounter >= questions.length - 1 ? 'Explore other modes' : 'Next question'}</button>
        </div>
      ) : (
        <div className="modes">
          {doesPreviousSessionExist ?
            <>
              <h4>Resume your last session</h4>
              <button onClick={resumeGame}>Resume session</button>
            </> :
            null
          }
          <h4>Choose a mode</h4>
          {availableModes.map((mode) => (
            <QuestionsMode switchToMode={switchToMode} key={mode.title} title={mode.title} description={mode.description} data={mode.data} tagType={mode.tagType} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Questions;
