//// [tests/cases/conformance/jsx/tsxReactEmit4.tsx] ////

//// [file.tsx]
declare namespace JSX {
	interface Element { }
	interface IntrinsicElements {
		[s: string]: any;
	}
}
declare var React: any;

var p: any;
var openClosed1 = <div>

   {blah}

</div>;

// Should emit React.__spread({}, p, {x: 0})
var spread1 = <div {...p} x={0} />;

//// [file.js]
"use strict";
var p;
var openClosed1 = React.createElement("div", null, blah);
// Should emit React.__spread({}, p, {x: 0})
var spread1 = React.createElement("div", Object.assign({}, p, { x: 0 }));
