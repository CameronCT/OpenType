import React, { Component } from 'react';

interface WordDataTrace {
  value: string;
  correct: boolean;
}

interface WordData {
  trace: WordDataTrace[];
  incorrect: string[];
  correct: string[];
}

interface PlayerData {
  WPM: number;
  Accuracy: number;
}

interface IProps {
  text: string;
}

interface IState {
  text: string[];
  textBefore: string;
  textCurrent: string;
  textAfter: string;
  textInput: string;
  currentIndex: number;
  wordData: WordData;
  playerData: PlayerData;
  gameStatus: number;
  gameTimer: number;
}

class GameContainer extends Component<IProps, IState> {

  state:IState = {
    text: [],
    textBefore: '',
    textCurrent: '',
    textAfter: '',
    textInput: '',
    currentIndex: 0,
    wordData: {
      trace: [],
      correct: [],
      incorrect: []
    },
    playerData: {
      WPM: 0,
      Accuracy: 0
    },
    gameStatus: 0,
    gameTimer: 0
  };

  countdown: NodeJS.Timeout | undefined;

  componentDidMount() {
    const { text } = this.props;

    if (text) {
      const splitString = text.split(' ');
      this.setState({ text: splitString });
    }
  }

  componentWillUnmount() {
    if (this.countdown)
      clearInterval(this.countdown);
  }

  /**
   * Validates word with wordIndex
   * @param v
   */
  validateWord = (v: string) => {
    const { text, currentIndex, wordData } = this.state;

    this.setState({ currentIndex: (currentIndex + 1) })

    let input:string = v;
    let isCorrect:boolean = false;

    if (v.includes(" "))
      input = v.slice(0, -1);

    if (input === text[currentIndex]) {
      wordData.correct.push(text[currentIndex]);
      isCorrect = true;
    } else
      wordData.incorrect.push(text[currentIndex]);

    wordData.trace.push({ value: text[currentIndex], correct: isCorrect });

    /*
     * TODO: Calculate WPM
     */


    /*
     * Reset Input
     */
    this.setState({ textInput: '' });
  };

  /**
   * Updates the input for each text
   * @param {string} e.target.value
   */
  updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    const { gameStatus, currentIndex, text } = this.state;

    if (currentValue === " ")
      return false;

    if (gameStatus === 0) {
      this.setState({ gameStatus: 1 });
      this.countdown = setInterval(() => {
        const { gameTimer } = this.state;

        this.setState({ gameTimer: (gameTimer + 1) })
      }, 1000);
    }

    this.setState({ textInput: currentValue})

    if (currentValue && (currentIndex + 1) === text.length && currentValue === text[currentIndex] ||
      currentValue && currentIndex !== text.length && currentValue.includes(" ")
    )
      this.validateWord(currentValue);
  };

  render() {
    const { text, textBefore, textAfter, gameTimer, gameStatus, textInput, currentIndex, wordData } = this.state;

    return text && (
      <div className={"game--container"}>
        {gameStatus !== 0 && (
          <div className={"fixed z-50 bg-black bg-opacity-50 top-0 left-0 right-0 w-64 text-center mx-auto p-4 text-3xl font-bold text-white rounded-b"}>
            {gameTimer} seconds
          </div>
        )}
        <div className={"game--text"}>
          {wordData.trace.map((item, key) => (
            <span key={key} className={`word ${item.correct ? 'text-green-500': 'text-red-500'}`}>
              {item.value.split('').map((letter, key) => <span key={key}>{letter}</span>)}
              <span className={"space"} />
            </span>
          ))}
          <span className={"word text-gray-300"}>
            {text[currentIndex] && text[currentIndex].split('').map((letter, key) => <span key={key}>{letter}</span>)}
            <span className={"space"} />
          </span>
          <span className={"text-gray-700"}>
            {text.map((word, key) => key > currentIndex && (
              <span key={key} className={"word"}>
                {word.split('').map((letter, key) => <span key={key}>{letter}</span>)}
                <span className={"space"} />
              </span>
            ))}
          </span>
        </div>
        <div>
          <input type={"text"} name={"inputText"} value={textInput} onChange={this.updateInput} placeholder={"Enter your text here"} />
        </div>
      </div>
    )
  }

}

export default GameContainer;