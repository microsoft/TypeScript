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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var i = 1; i < arguments.length; i++) {
        var s = arguments[i];
        for (var p in s) if (s.hasOwnProperty(p)) t[p] = s[p];
    }
    return t;
};
var M;
(function (M) {
})(M || (M = {}));
var M;
(function (M) {
    // Should emit M.React.createElement
    //  and M.React.__spread
    var foo;
    var spread1 = M.React.createElement("div", __assign({x: ''}, foo, {y: ''}));
    // Quotes
    var x = M.React.createElement("div", null, "This \"quote\" thing");
})(M || (M = {}));
