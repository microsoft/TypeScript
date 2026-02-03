//// [tests/cases/conformance/jsx/tsxTypeErrors.tsx] ////

//// [tsxTypeErrors.tsx]
// A built-in element (OK)
var a1 = <div id="foo" />;

// A built-in element with a mistyped property (error)
var a2 = <img srce="foo.jpg" />

// A built-in element with a badly-typed attribute value (error)
var thing = { oops: 100 };
var a3 = <div id={thing} />

// Mistyped html name (error)
var e1 = <imag src="bar.jpg" />

// A custom type
class MyClass {
  props: {
    pt?: { x: number; y: number; };
	name?: string;
	reqd: boolean;
  }
}

// Let's use it
// TODO: Error on missing 'reqd'
var b1 = <MyClass reqd={true} />; 

// Mistyped attribute member
// sample.tsx(23,22): error TS2322: Type '{ x: number; y: string; }' is not assignable to type '{ x: number; y: number; }'.
//  Types of property 'y' are incompatible.
//    Type 'string' is not assignable to type 'number'.
var b2 = <MyClass pt={{x: 4, y: 'oops'}} />;



//// [tsxTypeErrors.jsx]
// A built-in element (OK)
var a1 = <div id="foo"/>;
// A built-in element with a mistyped property (error)
var a2 = <img srce="foo.jpg"/>;
// A built-in element with a badly-typed attribute value (error)
var thing = { oops: 100 };
var a3 = <div id={thing}/>;
// Mistyped html name (error)
var e1 = <imag src="bar.jpg"/>;
// A custom type
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    return MyClass;
}());
// Let's use it
// TODO: Error on missing 'reqd'
var b1 = <MyClass reqd={true}/>;
// Mistyped attribute member
// sample.tsx(23,22): error TS2322: Type '{ x: number; y: string; }' is not assignable to type '{ x: number; y: number; }'.
//  Types of property 'y' are incompatible.
//    Type 'string' is not assignable to type 'number'.
var b2 = <MyClass pt={{ x: 4, y: 'oops' }}/>;
