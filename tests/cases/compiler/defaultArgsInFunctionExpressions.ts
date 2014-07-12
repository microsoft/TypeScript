var f = function (a = 3) { return a; }; // Type should be (a?: number) => number
var n: number = f(4);
n = f();
var s: string = f('');
s = f();

// Type check the default argument with the type annotation
var f2 = function (a: string = 3) { return a; }; // Should error, but be of type (a: string) => string;
s = f2('');
s = f2();
n = f2();

// Contextually type the default arg with the type annotation
var f3 = function (a: (s: string) => any = (s) => <number>s) { };

// Type check using the function's contextual type
var f4: (a: number) => void = function (a = "") { };

// Contextually type the default arg using the function's contextual type
var f5: (a: (s: string) => any) => void = function (a = s => <number>s) { };

// Instantiated module
module T { }
module U {
    export var x;
}

var f6 = (t = T) => { };
var f7 = (t = U) => { return t; };

f7().x;