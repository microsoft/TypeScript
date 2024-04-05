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
var p;
var openClosed1 = React.createElement("div", null, blah);
// Should emit React.__spread({}, p, {x: 0})
var spread1 = React.createElement("div", __assign({}, p, { x: 0 }));
