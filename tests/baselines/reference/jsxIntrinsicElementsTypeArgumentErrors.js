//// [tests/cases/compiler/jsxIntrinsicElementsTypeArgumentErrors.tsx] ////

//// [jsxIntrinsicElementsTypeArgumentErrors.tsx]
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";

// opening + closing
const a = <div<>></div>; // empty type args

const b = <div<number,>></div>; // trailing comma type args

const c = <div<Missing>></div>; // nonexistant type args

const d = <div<Missing<AlsoMissing>>></div>; // nested missing type args

const e = <div<Record<object, object>>></div>; // existing but incorrect nested type args

const f = <div<number>></div>; // existing type argument with no internal issues

// self-closing
const g = <div<>/>; // empty type args

const h = <div<number,>/>; // trailing comma type args

const i = <div<Missing>/>; // nonexistant type args

const j = <div<Missing<AlsoMissing>>/>; // nested missing type args

const k = <div<Record<object, object>>/>; // existing but incorrect nested type args

const l = <div<number>/>; // existing type argument with no internal issues


//// [jsxIntrinsicElementsTypeArgumentErrors.js]
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";
// opening + closing
const a = React.createElement("div", null); // empty type args
const b = React.createElement("div", null); // trailing comma type args
const c = React.createElement("div", null); // nonexistant type args
const d = React.createElement("div", null); // nested missing type args
const e = React.createElement("div", null); // existing but incorrect nested type args
const f = React.createElement("div", null); // existing type argument with no internal issues
// self-closing
const g = React.createElement("div", null); // empty type args
const h = React.createElement("div", null); // trailing comma type args
const i = React.createElement("div", null); // nonexistant type args
const j = React.createElement("div", null); // nested missing type args
const k = React.createElement("div", null); // existing but incorrect nested type args
const l = React.createElement("div", null); // existing type argument with no internal issues
