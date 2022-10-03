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
exports.__esModule = true;
var React = require("react");
var props = { a: 1, b: 1 };
var Foo = function (props) { return <div>{props.a}</div>; };
// ok
var a1 = <Foo {...props}></Foo>;
var a2 = <Foo d={1} {...props}></Foo>;
// error
var b1 = <Foo a={1} {...props}></Foo>;
var b2 = <Foo a={1} b={2} {...props}></Foo>;
var b3 = <Foo a={1} d={1} {...props} {...{ d: 1 }}></Foo>;
var b4 = <Foo a={1} d={1} {...props} {...{ a: 1, d: 1 }}></Foo>;
