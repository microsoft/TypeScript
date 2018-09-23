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
var my = my || (my = {});
(function (my) {
})(my);
// OK
<my.div n='x'/>;
// Error
<my.other />;
var q = q || (q = {});
(function (q) {
    var mine = my;
    // OK
    <mine.div n='x'/>;
    // Error
    <mine.non />;
})(q);
