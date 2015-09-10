//// [file.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		[s: string]: any;
	}
}
declare var React: any;

var p;
var openClosed1 = <div>

   {blah}

</div>;

// Should emit React.__spread({}, p, {x: 0})
var spread1 = <div {...p} x={0} />;

//// [file.js]
var p;
var openClosed1 = React.createElement("div", null, blah);
// Should emit React.__spread({}, p, {x: 0})
var spread1 = React.createElement("div", React.__spread({}, p, {x: 0}));
