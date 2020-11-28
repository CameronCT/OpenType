import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className={"flex"}>
        <div className={"w-auto mr-auto"}>
          <div className={"text-3xl text-white uppercase font-bold tracking-wider"}>
            Open
            <span className={"text-3xl uppercase text-indigo-400"}>Type</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;