//// [tests/cases/conformance/jsx/tsxReactEmit4.tsx] ////

//// [file.tsx]
declare module JSX {
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
var p;
var openClosed1 = <div>

   {blah}

</div>;
var spread1 = <div {...p} x={0}/>;
