//@jsx: preserve
//@module: amd

//@filename: file.tsx
declare module JSX {
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
