//// [typeAliases.ts]
// Writing a reference to a type alias has exactly the same effect as writing the aliased type itself.

type Meters = number

enum E { x = 10 }

declare function f(a: string): boolean;
declare function f(a: Meters): string;
f(E.x).toLowerCase();

type StringAndBoolean = [string, boolean]
declare function f1(s: StringAndBoolean): string;
var x: [string, boolean];
f1(x);

var y: StringAndBoolean = ["1", false];
y[0].toLowerCase();

//// [typeAliases.js]
// Writing a reference to a type alias has exactly the same effect as writing the aliased type itself.
var E;
(function (E) {
    E[E["x"] = 10] = "x";
})(E || (E = {}));
f(10 /* x */).toLowerCase();
var x;
f1(x);
var y = ["1", false];
y[0].toLowerCase();
