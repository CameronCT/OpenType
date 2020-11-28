import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className={"flex flex-wrap justify-center"}>
        <div className={"w-full text-center lg:w-1/2 lg:text-left"}>
          <div className={"text-3xl text-white uppercase font-bold tracking-wider"}>
            Open
            <span className={"text-3xl uppercase text-indigo-400"}>Type</span>
          </div>
        </div>
        <div className={"w-full text-center lg:w-1/2 lg:text-right my-auto"}>
          <div className={"text-sm text-gray-300 uppercase font-semibold tracking-wider"}>
            The free open-source typing script
          </div>
        </div>
      </div>
    )
  }
}

export default Header;