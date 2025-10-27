//// [tests/cases/conformance/jsx/tsxReactEmit5.tsx] ////

//// [file.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		[s: string]: any;
	}
}

//// [test.d.ts]
export var React;

//// [react-consumer.tsx]
import {React} from "./test";
// Should emit test_1.React.createElement
//  and React.__spread
var foo: any;
var spread1 = <div x='' {...foo} y='' />;


//// [file.js]
//// [react-consumer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("./test");
// Should emit test_1.React.createElement
//  and React.__spread
var foo;
var spread1 = test_1.React.createElement("div", Object.assign({ x: '' }, foo, { y: '' }));
