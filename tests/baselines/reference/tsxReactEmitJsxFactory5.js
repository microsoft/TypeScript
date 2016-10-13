//// [tests/cases/conformance/jsx/tsxReactEmitJsxFactory5.tsx] ////

//// [file.tsx]
declare module JSX {
	interface IntrinsicElements {
		[s: string]: any;
	}
}

//// [h.d.ts]
export var h;

//// [react-consumer.tsx]
import {h} from "./h";
// Should not elide h import
<div />;


//// [file.js]
//// [react-consumer.js]
"use strict";
var h_1 = require("./h");
// Should not elide h import
h("div", null);
