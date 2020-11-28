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
  timeStart: number;
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
    timeStart: 0,
  }

  componentDidMount() {
    const { text } = this.props;

    if (text) {
      const splitString = text.split(' ');
      this.setState({ text: splitString });
    }
  }

  /**
   * Validates word with wordIndex
   * @param v
   */
  validateWord = (v: string) => {
    const { text, currentIndex, wordData } = this.state;

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

    this.setState({ textInput: '' });
    this.setState({ currentIndex: (currentIndex + 1) })
  };

  /**
   * Updates the input for each text
   * @param {string} e.target.value
   */
  updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);

    const currentValue = e.target.value;
    const { timeStart, currentIndex, text } = this.state;

    if (timeStart === 0)
      this.setState({ timeStart: (new Date().getTime()) });

    this.setState({ textInput: currentValue})

    if (
      currentIndex === text.length && currentValue.length === text[currentIndex].length ||
      currentIndex !== text.length && currentValue.includes(" ")
    )
      this.validateWord(currentValue);
  };

  render() {
    const { text, textBefore, textAfter, textInput, currentIndex, wordData } = this.state;

    console.log(text[currentIndex]);

    return text && (
      <div className={"game--container"}>
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