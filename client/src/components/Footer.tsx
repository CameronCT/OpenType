import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className={"flex flex-wrap uppercase text-sm uppercase text-gray-300 font-semibold"}>
        <div className={"w-full text-center lg:w-1/2 lg:text-left"}>
          OpenType - by <a href={"https://cameronct.com/"} className={"text-indigo-400 hover:text-indigo-500"} rel={"noopener noreferrer"} target={"_blank"}>CameronCT</a>.
        </div>
        <div className={"w-full text-center lg:w-1/2 lg:text-right"}>
          Contribute on <a href={"https://github.com/CameronCT/OpenType"} className={"text-indigo-400 hover:text-indigo-500"} rel={"noopener noreferrer"} target={"_blank"}>GitHub</a>.
        </div>
      </div>
    )
  }
}

export default Footer;