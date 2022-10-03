//@declaration: true
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