//// [tests/cases/conformance/types/nonPrimitive/nonPrimitiveAccessProperty.ts] ////

//// [nonPrimitiveAccessProperty.ts]
var a: object;
a.toString();
a.nonExist(); // error

var { destructuring } = a; // error
var { ...rest } = a; // ok


//// [nonPrimitiveAccessProperty.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var a;
a.toString();
a.nonExist(); // error
var destructuring = a.destructuring; // error
var rest = __rest(a, []); // ok
