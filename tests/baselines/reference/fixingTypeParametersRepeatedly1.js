//// [tests/cases/compiler/fixingTypeParametersRepeatedly1.ts] ////

//// [fixingTypeParametersRepeatedly1.ts]
declare function f<T>(x: T, y: (p: T) => T, z: (p: T) => T): T;
f("", x => null, x => x.toLowerCase());

// First overload of g should type check just like f
declare function g<T>(x: T, y: (p: T) => T, z: (p: T) => T): T;
declare function g();
g("", x => null, x => x.toLowerCase());

//// [fixingTypeParametersRepeatedly1.js]
f("", function (x) { return null; }, function (x) { return x.toLowerCase(); });
g("", function (x) { return null; }, function (x) { return x.toLowerCase(); });
