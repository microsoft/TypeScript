// @jsx: preserve

//@filename: react.d.ts
declare module 'react' {
	class Component<T, U> { }
}

//@filename: app.tsx
import * as React from 'react';

export class Text extends React.Component<{}, {}> {
  _tagName: "div" = 'div';

  render() {
    return (
      <this._tagName> Hello world </this._tagName>
    );
  }
}