//// [tests/cases/conformance/jsx/tsxStatelessFunctionComponentOverload1.tsx] ////

//// [file.tsx]
import React = require('react')

declare function OneThing(k: {yxx: string}): JSX.Element;
declare function OneThing(k: {yxx1: string, children: string}): JSX.Element;
declare function OneThing(l: {yy: number, yy1: string}): JSX.Element;
declare function OneThing(l: {yy: number, yy1: string, yy2: boolean}): JSX.Element;
declare function OneThing(l1: {data: string, "data-prop": boolean}): JSX.Element;

// OK
const c1 = <OneThing yxx='ok' />
const c2 = <OneThing yy={100}  yy1="hello"/>
const c3 = <OneThing yxx="hello" ignore-prop />
const c4 = <OneThing data="hello" data-prop />
const c5 = <OneThing yxx1='ok'>Hello</OneThing>


declare function TestingOneThing({y1: string}): JSX.Element;
declare function TestingOneThing(j: {"extra-data": string, yy?: string}): JSX.Element;
declare function TestingOneThing(n: {yy: number, direction?: number}): JSX.Element;
declare function TestingOneThing(n: {yy: string, name: string}): JSX.Element;

// OK
const d1 = <TestingOneThing y1 extra-data />;
const d2 = <TestingOneThing extra-data="hello" />;
const d3 = <TestingOneThing extra-data="hello" yy="hihi" />;
const d4 = <TestingOneThing extra-data="hello" yy={9} direction={10} />;
const d5 = <TestingOneThing extra-data="hello" yy="hello" name="Bob" />;


declare function TestingOptional(a: {y1?: string, y2?: number}): JSX.Element;
declare function TestingOptional(a: {y1: boolean, y2?: number, y3: boolean}): JSX.Element;

// OK
const e1 = <TestingOptional />
const e3 = <TestingOptional y1="hello"/>
const e4 = <TestingOptional y1="hello" y2={1000} />
const e5 = <TestingOptional y1 y3/>
const e6 = <TestingOptional y1 y3 y2={10} />
const e2 = <TestingOptional y1 y3 extra-prop/>




//// [file.jsx]
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // OK
    var c1 = <OneThing yxx='ok'/>;
    var c2 = <OneThing yy={100} yy1="hello"/>;
    var c3 = <OneThing yxx="hello" ignore-prop/>;
    var c4 = <OneThing data="hello" data-prop/>;
    var c5 = <OneThing yxx1='ok'>Hello</OneThing>;
    // OK
    var d1 = <TestingOneThing y1 extra-data/>;
    var d2 = <TestingOneThing extra-data="hello"/>;
    var d3 = <TestingOneThing extra-data="hello" yy="hihi"/>;
    var d4 = <TestingOneThing extra-data="hello" yy={9} direction={10}/>;
    var d5 = <TestingOneThing extra-data="hello" yy="hello" name="Bob"/>;
    // OK
    var e1 = <TestingOptional />;
    var e3 = <TestingOptional y1="hello"/>;
    var e4 = <TestingOptional y1="hello" y2={1000}/>;
    var e5 = <TestingOptional y1 y3/>;
    var e6 = <TestingOptional y1 y3 y2={10}/>;
    var e2 = <TestingOptional y1 y3 extra-prop/>;
});
