//// [tests/cases/conformance/jsx/checkJsxChildrenProperty5.tsx] ////

//// [file.tsx]
import React = require('react');

interface Prop {
    a: number,
    b: string,
    children: Button;
}

class Button extends React.Component<any, any> {
    render() {
        return (<div>My Button</div>)
    }
}

function Comp(p: Prop) {
    return <div>{p.b}</div>;
}

// Error: no children specified
let k = <Comp a={10} b="hi" />;

// Error: JSX.element is not the same as JSX.ElementClass
let k1 =
    <Comp a={10} b="hi">
        <Button />
    </Comp>;
let k2 =
    <Comp a={10} b="hi">
        {Button}
    </Comp>;

//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Button extends React.Component {
    render() {
        return (<div>My Button</div>);
    }
}
function Comp(p) {
    return <div>{p.b}</div>;
}
// Error: no children specified
let k = <Comp a={10} b="hi"/>;
// Error: JSX.element is not the same as JSX.ElementClass
let k1 = <Comp a={10} b="hi">
        <Button />
    </Comp>;
let k2 = <Comp a={10} b="hi">
        {Button}
    </Comp>;
