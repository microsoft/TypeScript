//// [tests/cases/compiler/tsxFragmentChildrenCheck.ts] ////

//// [my-component.tsx]
/// <reference path="/.lib/react.d.ts" />
declare var React: any;

export function MyComponent(props: any) {
    return <span>my component</span>;
}

//// [file1.tsx]
import * as React from 'react'
import { MyComponent } from './my-component'

const MY_STRING: string = 'Ceci n\'est pas une string.'
const MY_CLASSNAME: string = 'jeclass'

class RenderString extends React.PureComponent<any, any> {
  render() {
    return (
      <>
        <MyComponent />
        <span>{ MY_STRING }</span>
        <span className={ MY_CLASSNAME } />
      </>
    )
  }
}

export default RenderString

//// [my-component.js]
/// <reference path="/.lib/react.d.ts" />
export function MyComponent(props) {
    return React.createElement("span", null, "my component");
}
//// [file1.js]
import * as React from 'react';
import { MyComponent } from './my-component';
const MY_STRING = 'Ceci n\'est pas une string.';
const MY_CLASSNAME = 'jeclass';
class RenderString extends React.PureComponent {
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement(MyComponent, null),
            React.createElement("span", null, MY_STRING),
            React.createElement("span", { className: MY_CLASSNAME })));
    }
}
export default RenderString;
