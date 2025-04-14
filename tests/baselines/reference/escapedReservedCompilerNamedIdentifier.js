//// [tests/cases/compiler/escapedReservedCompilerNamedIdentifier.ts] ////

//// [escapedReservedCompilerNamedIdentifier.ts]
// double underscores
var __proto__ = 10;
var o = {
    "__proto__": 0
};
var b = o["__proto__"];
var o1 = {
    __proto__: 0
};
var b1 = o1["__proto__"];
// Triple underscores
var ___proto__ = 10;
var o2 = {
    "___proto__": 0
};
var b2 = o2["___proto__"];
var o3 = {
    ___proto__: 0
};
var b3 = o3["___proto__"];
// One underscore
var _proto__ = 10;
var o4 = {
    "_proto__": 0
};
var b4 = o4["_proto__"];
var o5 = {
    _proto__: 0
};
var b5 = o5["_proto__"];

//// [escapedReservedCompilerNamedIdentifier.js]
// double underscores
var __proto__ = 10;
var o = {
    "__proto__": 0
};
var b = o["__proto__"];
var o1 = {
    __proto__: 0
};
var b1 = o1["__proto__"];
// Triple underscores
var ___proto__ = 10;
var o2 = {
    "___proto__": 0
};
var b2 = o2["___proto__"];
var o3 = {
    ___proto__: 0
};
var b3 = o3["___proto__"];
// One underscore
var _proto__ = 10;
var o4 = {
    "_proto__": 0
};
var b4 = o4["_proto__"];
var o5 = {
    _proto__: 0
};
var b5 = o5["_proto__"];


//// [escapedReservedCompilerNamedIdentifier.d.ts]
declare var __proto__: number;
declare var o: {
    __proto__: number;
};
declare var b: number;
declare var o1: {
    __proto__: number;
};
declare var b1: number;
declare var ___proto__: number;
declare var o2: {
    ___proto__: number;
};
declare var b2: number;
declare var o3: {
    ___proto__: number;
};
declare var b3: number;
declare var _proto__: number;
declare var o4: {
    _proto__: number;
};
declare var b4: number;
declare var o5: {
    _proto__: number;
};
declare var b5: number;
