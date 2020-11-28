import React, { Component } from 'react';

interface IProps {
  text: string;
}

interface IState {
  textBefore: string;
  textCurrent: string;
  textAfter: string;
  textInput: string;
}

class GameContainer extends Component<IProps, IState> {

  state:IState = {
    textBefore: '',
    textCurrent: '',
    textAfter: '',
    textInput: ''
  }



}

export default GameContainer;