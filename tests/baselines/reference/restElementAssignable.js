//// [tests/cases/compiler/restElementAssignable.ts] ////

//// [restElementAssignable.ts]
{
    const { ...props } = {};
    // Use to fail
    const t1: { [x: symbol]: unknown } = props;
    // Working equivalent
    const t2: { [x: symbol]: unknown } = {};
}

{
    const { ...props } = { a: 1, b: false, c: "str" };
    // Use to fail
    const t1: { [x: string]: number | boolean | string } = props;
    // Working equivalent
    const t2: { [x: string]: number | boolean | string } = { a: 1, b: false, c: "str" };;
}


//// [restElementAssignable.js]
"use strict";
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
{
    var props = __rest({}, []);
    // Use to fail
    var t1 = props;
    // Working equivalent
    var t2 = {};
}
{
    var props = __rest({ a: 1, b: false, c: "str" }, []);
    // Use to fail
    var t1 = props;
    // Working equivalent
    var t2 = { a: 1, b: false, c: "str" };
    ;
}
