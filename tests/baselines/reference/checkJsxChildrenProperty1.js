//// [tests/cases/conformance/jsx/checkJsxChildrenProperty1.tsx] ////

//// [file.tsx]
/// <reference path="/.lib/react.d.ts" />

import React = require('react');

interface Prop {
    a: number,
    b: string,
    children: string | JSX.Element
}

function Comp(p: Prop) {
    return <div>{p.b}</div>;
}

// OK
let k = <Comp a={10} b="hi" children ="lol" />;
let k1 =
    <Comp a={10} b="hi">
        hi hi hi!
    </Comp>;
let k2 =
    <Comp a={10} b="hi">
        <div>hi hi hi!</div>
    </Comp>;

//// [file.jsx]
/// <reference path="/.lib/react.d.ts" />
function Comp(p) {
    return <div>{p.b}</div>;
}
// OK
let k = <Comp a={10} b="hi" children="lol"/>;
let k1 = <Comp a={10} b="hi">
        hi hi hi!
    </Comp>;
let k2 = <Comp a={10} b="hi">
        <div>hi hi hi!</div>
    </Comp>;
export {};
