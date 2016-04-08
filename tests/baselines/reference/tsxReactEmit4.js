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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var i = 1, n = arguments.length; i < n; i++) {
        var s = arguments[i];
        if (s != null) for (var p in s) if (s.hasOwnProperty(p)) t[p] = s[p];
    }
    return t;
};
var p;
var openClosed1 = React.createElement("div", null, blah);
// Should emit React.__spread({}, p, {x: 0})
var spread1 = React.createElement("div", __assign({}, p, {x: 0}));
