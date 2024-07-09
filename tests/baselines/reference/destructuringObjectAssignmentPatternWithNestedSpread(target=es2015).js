//// [tests/cases/conformance/es6/destructuring/destructuringObjectAssignmentPatternWithNestedSpread.ts] ////

//// [destructuringObjectAssignmentPatternWithNestedSpread.ts]
let a: any, b: any, c: any = {x: {a: 1, y: 2}}, d: any;
({x: {a, ...b} = d} = c);


//// [destructuringObjectAssignmentPatternWithNestedSpread.js]
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
var _a, _b;
let a, b, c = { x: { a: 1, y: 2 } }, d;
(_a = c.x, _b = _a === void 0 ? d : _a, { a } = _b, b = __rest(_b, ["a"]));
