//// [tests/cases/conformance/jsx/tsxSpreadInvalidType.tsx] ////

//// [a.tsx]
namespace JSX {
    export interface IntrinsicElements { [key: string]: any }
}

const a = {} as never;
const b = null;
const c = undefined;

const d = <div { ...a } />
const e = <div { ...b } />
const f = <div { ...c } />


//// [a.jsx]
"use strict";
var a = {};
var b = null;
var c = undefined;
var d = <div {...a}/>;
var e = <div {...b}/>;
var f = <div {...c}/>;
