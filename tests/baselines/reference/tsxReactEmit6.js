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
	var foo: any;
	var spread1 = <div x='' {...foo} y='' />;

	// Quotes
	var x = <div>This "quote" thing</div>;
}



//// [file.js]
//// [react-consumer.js]
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var M;
(function (M) {
})(M || (M = {}));
(function (M) {
    // Should emit M.React.createElement
    //  and M.React.__spread
    var foo;
    var spread1 = M.React.createElement("div", __assign({ x: '' }, foo, { y: '' }));
    // Quotes
    var x = M.React.createElement("div", null, "This \"quote\" thing");
})(M || (M = {}));
