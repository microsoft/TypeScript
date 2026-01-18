//// [tests/cases/conformance/jsx/tsxElementResolution8.tsx] ////

//// [file.tsx]
declare namespace JSX {
	interface Element { }
	interface IntrinsicElements { }
}

// Error
var Div = 3;
<Div />;

// OK
function Fact(): any { return null; }
<Fact />

// Error
function Fnum(): number{ return 42; }
<Fnum />

interface Obj1 {
	new(): {};
	(): number;
}
declare var Obj1: Obj1;
<Obj1 />; // OK, prefer construct signatures

interface Obj2 {
	(): number;
}
declare var Obj2: Obj2;
<Obj2 />; // Error

interface Obj3 {
}
declare var Obj3: Obj3;
<Obj3 />; // Error


//// [file.jsx]
// Error
var Div = 3;
<Div />;
// OK
function Fact() { return null; }
<Fact />;
// Error
function Fnum() { return 42; }
<Fnum />;
<Obj1 />; // OK, prefer construct signatures
<Obj2 />; // Error
<Obj3 />; // Error
