//// [tests/cases/conformance/jsx/jsxSpreadOverwritesAttributeStrict.tsx] ////

//// [file.tsx]
import React = require('react');

interface Props {
    a: number;
    b: number;
    c?: number;
    d?: number;
}


const props: Props = { a: 1, b: 1 };
const Foo = (props: Props) => <div>{ props.a }</div>;

// ok
const a1 = <Foo {...props}></Foo>;
const a2 = <Foo d={1} {...props}></Foo>;

// error
const b1 = <Foo a={1} {...props}></Foo>;
const b2 = <Foo a={1} b={2} {...props}></Foo>;
const b3 = <Foo a={1} d={1} {...props} {...{ d: 1 }}></Foo>;
const b4 = <Foo a={1} d={1} {...props} {...{ a: 1, d: 1 }}></Foo>;


//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const props = { a: 1, b: 1 };
const Foo = (props) => <div>{props.a}</div>;
// ok
const a1 = <Foo {...props}></Foo>;
const a2 = <Foo d={1} {...props}></Foo>;
// error
const b1 = <Foo a={1} {...props}></Foo>;
const b2 = <Foo a={1} b={2} {...props}></Foo>;
const b3 = <Foo a={1} d={1} {...props} {...{ d: 1 }}></Foo>;
const b4 = <Foo a={1} d={1} {...props} {...{ a: 1, d: 1 }}></Foo>;
