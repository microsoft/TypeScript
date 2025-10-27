//// [tests/cases/conformance/jsx/checkJsxChildrenProperty8.tsx] ////

//// [file.tsx]
import React = require('react');

interface Prop {
    a: number,
    b: string,
    children: string | JSX.Element | (string | JSX.Element)[];
}

class Button extends React.Component<any, any> {
    render() {
        return (<div>My Button</div>)
    }
}

function AnotherButton(p: any) {
    return <h1>Just Another Button</h1>;
}

function Comp(p: Prop) {
    return <div>{p.b}</div>;
}

// OK
let k1 = <Comp a={10} b="hi"><Button />  <AnotherButton /></Comp>;
let k2 = <Comp a={10} b="hi"><Button />
    <AnotherButton />  </Comp>;
let k3 = <Comp a={10} b="hi">    <Button />
    <AnotherButton /></Comp>;
let k4 = <Comp a={10} b="hi"><Button />  </Comp>;

//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Button extends React.Component {
    render() {
        return (<div>My Button</div>);
    }
}
function AnotherButton(p) {
    return <h1>Just Another Button</h1>;
}
function Comp(p) {
    return <div>{p.b}</div>;
}
// OK
let k1 = <Comp a={10} b="hi"><Button />  <AnotherButton /></Comp>;
let k2 = <Comp a={10} b="hi"><Button />
    <AnotherButton />  </Comp>;
let k3 = <Comp a={10} b="hi">    <Button />
    <AnotherButton /></Comp>;
let k4 = <Comp a={10} b="hi"><Button />  </Comp>;
