//// [tests/cases/conformance/jsx/tsxReactEmit6.tsx] ////

//// [file.tsx]

declare module JSX {
	interface Element { }
	interface IntrinsicElements {
		[s: string]: any;
	}
}

//// [react-consumer.tsx]
namespace M {
	export var React: any;
}

namespace M {
	// Should emit M.React.createElement
	//  and M.React.__spread
	var foo;
	var spread1 = <div x='' {...foo} y='' />;

	// Quotes
	var x = <div>This "quote" thing</div>;
}



//// [file.js]
//// [react-consumer.js]
var M;
(function (M) {
})(M || (M = {}));
var M;
(function (M) {
    // Should emit M.React.createElement
    //  and M.React.__spread
    var foo;
    var spread1 = M.React.createElement("div", M.React.__spread({x: ''}, foo, {y: ''}));
    // Quotes
    var x = M.React.createElement("div", null, "This \"quote\" thing");
})(M || (M = {}));
