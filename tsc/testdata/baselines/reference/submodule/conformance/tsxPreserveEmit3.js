//// [tests/cases/conformance/jsx/tsxPreserveEmit3.tsx] ////

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
// This import should be elided
import {React} from "./test";


//// [file.jsx]
//// [react-consumer.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
