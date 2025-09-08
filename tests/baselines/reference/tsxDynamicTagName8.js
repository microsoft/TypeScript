//// [tests/cases/conformance/jsx/tsxDynamicTagName8.tsx] ////

//// [react.d.ts]
declare module 'react' {
	class Component<T, U> { }
}

//// [app.tsx]
import * as React from 'react';

export class Text extends React.Component<{}, {}> {
  _tagName: string = 'div';

  render() {
    return (
      <this._tagName> Hello world </this._tagName>
    );
  }
}

//// [app.jsx]
import * as React from 'react';
export class Text extends React.Component {
    _tagName = 'div';
    render() {
        return (<this._tagName> Hello world </this._tagName>);
    }
}
