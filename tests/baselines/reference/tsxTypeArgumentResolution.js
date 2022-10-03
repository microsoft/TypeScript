//// [file.tsx]
import React = require('react');

interface Prop {
    a: number,
    b: string
}

declare class MyComp<P> extends React.Component<P, {}> {
    internalProp: P;
}

let x = <MyComp<Prop> a={10} b="hi" />; // OK

x = <MyComp<Prop> a={10} b="hi"></MyComp>; // OK

x = <MyComp<Prop> a={10} b={20} />; // error

x = <MyComp<Prop> a={10} b={20}></MyComp>; // error

x = <MyComp<Prop, Prop> a={10} b="hi" />; // error

x = <MyComp<Prop, Prop> a={10} b="hi"></MyComp>; // error

x = <MyComp<> a={10} b="hi" />; // error

x = <MyComp<> a={10} b="hi"></MyComp>; // error

x= <MyComp<{}> /> // OK

x= <MyComp<{}>></MyComp> // OK

declare class MyComp2<P extends { a: string }, P2 = {}> extends React.Component<P & P2, {}> {
    internalProp: [P, P2];
}
x = <MyComp2<{a: string, b: string}> a="a" b="b" />; // OK

x = <MyComp2<{a: string, b: string}> a="a" b="b"></MyComp2>; // OK

x = <MyComp2<Prop> a={10} b="hi" />; // error

x = <MyComp2<Prop> a={10} b="hi"></MyComp2>; // error

x = <MyComp2<{a: string}, {b: string}> a="hi" b="hi" />; // OK

x = <MyComp2<{a: string}, {b: string}> a="hi" b="hi"></MyComp2>; // OK

x = <MyComp2<{a: string}, {b: string}, Prop> a="hi" b="hi" />; // error

x = <MyComp2<{a: string}, {b: string}, Prop> a="hi" b="hi"></MyComp2>; // error

x = <MyComp2<{a: string}, {b: number}> a="hi" b="hi" />; // error

x = <MyComp2<{a: string}, {b: number}> a="hi" b="hi"></MyComp2>; // error


//// [file.jsx]
"use strict";
exports.__esModule = true;
var React = require("react");
var x = <MyComp a={10} b="hi"/>; // OK
x = <MyComp a={10} b="hi"></MyComp>; // OK
x = <MyComp a={10} b={20}/>; // error
x = <MyComp a={10} b={20}></MyComp>; // error
x = <MyComp a={10} b="hi"/>; // error
x = <MyComp a={10} b="hi"></MyComp>; // error
x = <MyComp a={10} b="hi"/>; // error
x = <MyComp a={10} b="hi"></MyComp>; // error
x = <MyComp />; // OK
x = <MyComp></MyComp>; // OK
x = <MyComp2 a="a" b="b"/>; // OK
x = <MyComp2 a="a" b="b"></MyComp2>; // OK
x = <MyComp2 a={10} b="hi"/>; // error
x = <MyComp2 a={10} b="hi"></MyComp2>; // error
x = <MyComp2 a="hi" b="hi"/>; // OK
x = <MyComp2 a="hi" b="hi"></MyComp2>; // OK
x = <MyComp2 a="hi" b="hi"/>; // error
x = <MyComp2 a="hi" b="hi"></MyComp2>; // error
x = <MyComp2 a="hi" b="hi"/>; // error
x = <MyComp2 a="hi" b="hi"></MyComp2>; // error
