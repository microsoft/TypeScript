//@filename: file.tsx
//@jsx: preserve
declare namespace JSX {
	interface Element { }
	interface IntrinsicElements { }
}

namespace my {
    export var div: any;
}
// OK
<my.div n='x' />;
// Error
<my.other />;

namespace q {
    import mine = my;
    // OK
    <mine.div n='x' />;
    // Error
    <mine.non />;
}
