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
var array = [{ a: 0, b: 1 }];
for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
    var _a = array_1[_i];
    var a = _a.a, rest = __rest(_a, ["a"]);
    void a;
}
