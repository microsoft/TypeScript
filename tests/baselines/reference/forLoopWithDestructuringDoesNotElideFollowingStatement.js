//// [tests/cases/compiler/forLoopWithDestructuringDoesNotElideFollowingStatement.ts] ////

//// [forLoopWithDestructuringDoesNotElideFollowingStatement.ts]
let array = [{a: 0, b: 1}]
for (let { a, ...rest } of array)
    void a

//// [forLoopWithDestructuringDoesNotElideFollowingStatement.js]
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
let array = [{ a: 0, b: 1 }];
for (let _a of array) {
    let { a } = _a, rest = __rest(_a, ["a"]);
    void a;
}
