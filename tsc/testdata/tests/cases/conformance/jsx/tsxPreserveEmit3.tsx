// @target: es2015
//@jsx: preserve
//@module: commonjs

//@filename: file.tsx
declare namespace JSX {
	interface Element { }
	interface IntrinsicElements {
		[s: string]: any;
	}
}

//@filename: test.d.ts
export var React;

//@filename: react-consumer.tsx
// This import should be elided
import {React} from "./test";
