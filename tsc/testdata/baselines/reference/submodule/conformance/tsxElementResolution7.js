//// [tests/cases/conformance/jsx/tsxElementResolution7.tsx] ////

//// [file.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements { }
}

module my {
    export var div: any;
}
// OK
<my.div n='x' />;
// Error
<my.other />;

module q {
    import mine = my;
    // OK
    <mine.div n='x' />;
    // Error
    <mine.non />;
}


//// [file.jsx]
var my;
(function (my) {
})(my || (my = {}));
<my.div n='x'/>;
<my.other />;
var q;
(function (q) {
    var mine = my;
    <mine.div n='x'/>;
    <mine.non />;
})(q || (q = {}));
