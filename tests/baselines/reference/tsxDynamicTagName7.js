//// [tests/cases/conformance/jsx/tsxDynamicTagName7.tsx] ////

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
      <this/>  // this should be an error
    );
  }
}

//// [app.jsx]
import * as React from 'react';
export class Text extends React.Component {
    _tagName = 'div';
    render() {
        return (<this /> // this should be an error
        );
    }
}
