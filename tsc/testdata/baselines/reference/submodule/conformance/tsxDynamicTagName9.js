//// [tests/cases/conformance/jsx/tsxDynamicTagName9.tsx] ////

//// [react.d.ts]
declare module 'react' {
	class Component<T, U> { }
}

//// [app.tsx]
import * as React from 'react';

export class Text extends React.Component<{}, {}> {
  _tagName: "div" = 'div';

  render() {
    return (
      <this._tagName> Hello world </this._tagName>
    );
  }
}

//// [app.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const React = require("react");
class Text extends React.Component {
    _tagName = 'div';
    render() {
        return (<this._tagName> Hello world </this._tagName>);
    }
}
exports.Text = Text;
