//// [tsxReactEmit4.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		[s: string]: any;
	}
}

var p;
var openClosed1 = <div>

   {blah}

</div>;


//// [tsxReactEmit4.js]
var p;
var openClosed1 = React.createElement("div", null, blah);
