// @strict: true
// @jsx: react
/// <reference path="/.lib/react16.d.ts" />

// Repro from #44797

import * as React from "react";

interface Props {
    foo: string;
    bar: number;
    [dataProp: `data-${string}`]: string;
}

function Yadda(props: Props) {
    return <div />;
}

let props: Props = {
    foo: "",
    bar: 0,
    "data-yadda": 42,
};

let x1 = <Yadda foo="hello" bar={42} data-yadda={42} />;



let propsObj1: Props = {
    foo: "",
    bar: 0,
    "data-yadda": 42,
};

// Should error on data-yadda
let x2 = <Yadda foo="hello" bar={42} data-yadda={42} />;

/////////

let propsObj2 = {
    foo: "",
    bar: 0,
    "data-yadda": 42,
};

// Should error on data-yadda
let y = <Yadda {...propsObj2} />

propsObj1 = propsObj2;