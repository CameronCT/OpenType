import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import quotes from '../data/quotes.json';
import GameContainer from './Game/GameContainer';

interface IState {
    currentText: string | null;
    gameLoaded: boolean;
}

class Home extends Component<{}, IState> {

    state : IState = {
      currentText: null,
      gameLoaded: false
    }

    componentDidMount() {
        this.getText();
    }

    getText = () => {
        this.setState({ currentText: quotes[0] });
    }

    render() {

        const { currentText } = this.state;

        return (
            <div className="max-w-screen-md mx-auto py-32">
                <Header />
                <div>
                  {currentText !== null ? (
                    <GameContainer text={currentText} />
                  ) : 'Loading'}
                </div>
                <Footer />
            </div>
        )
    }
}

export default Home;