//// [tests/cases/conformance/jsx/tsxSpreadAttributesResolution4.tsx] ////

//// [file.tsx]
import React = require('react');

interface PoisonedProp {
    x: string;
    y: 2;
}

class Poisoned extends React.Component<PoisonedProp, {}> {
    render() {
        return <div>Hello</div>;
    }
}

const obj: PoisonedProp = {
    x: "hello world",
    y: 2
};

// OK
let p = <Poisoned {...obj} />;

class EmptyProp extends React.Component<{}, {}> {
    render() {
        return <div>Default hi</div>;
    }
}

// OK
let j: any;
let e1 = <EmptyProp {...{}} />;
let e2 = <EmptyProp {...j} />
let e3 = <EmptyProp {...{ ref: (input) => { this.textInput = input; } }} />
let e4 = <EmptyProp data-prop />
let e5 = <EmptyProp {...{ "data-prop": true}} />

//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Poisoned extends React.Component {
    render() {
        return <div>Hello</div>;
    }
}
const obj = {
    x: "hello world",
    y: 2
};
// OK
let p = <Poisoned {...obj}/>;
class EmptyProp extends React.Component {
    render() {
        return <div>Default hi</div>;
    }
}
// OK
let j;
let e1 = <EmptyProp {...{}}/>;
let e2 = <EmptyProp {...j}/>;
let e3 = <EmptyProp {...{ ref: (input) => { this.textInput = input; } }}/>;
let e4 = <EmptyProp data-prop/>;
let e5 = <EmptyProp {...{ "data-prop": true }}/>;
