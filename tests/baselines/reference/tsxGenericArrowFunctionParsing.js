//// [file.tsx]
declare module JSX {
	interface Element { isElement; }
}

var T: any, T1: any, T2: any;

// This is an element
var x1 = <T>() => {}</T>;
x1.isElement;

// This is a generic function
var x2 = <T extends {}>() => {};
x2();

// This is a generic function
var x3 = <T, T1>() => {};
x3();

// This is an element
var x4 = <T extends={true}>() => {}</T>;
x4.isElement;

// This is an element
var x5 = <T extends>() => {}</T>;
x5.isElement;



//// [file.jsx]
var T, T1, T2;
// This is an element
var x1 = <T>() => </T>;
x1.isElement;
// This is a generic function
var x2 = function () { };
x2();
// This is a generic function
var x3 = function () { };
x3();
// This is an element
var x4 = <T extends={true}>() => </T>;
x4.isElement;
// This is an element
var x5 = <T extends>() => </T>;
x5.isElement;
