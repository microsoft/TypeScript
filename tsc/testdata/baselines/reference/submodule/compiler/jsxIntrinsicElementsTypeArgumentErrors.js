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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
const React = require("react");
// opening + closing
const a = <div></div>; // empty type args
const b = <div></div>; // trailing comma type args
const c = <div></div>; // nonexistant type args
const d = <div></div>; // nested missing type args
const e = <div></div>; // existing but incorrect nested type args
const f = <div></div>; // existing type argument with no internal issues
// self-closing
const g = <div />; // empty type args
const h = <div />; // trailing comma type args
const i = <div />; // nonexistant type args
const j = <div />; // nested missing type args
const k = <div />; // existing but incorrect nested type args
const l = <div />; // existing type argument with no internal issues
