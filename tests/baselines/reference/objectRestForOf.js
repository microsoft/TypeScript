//// [objectRestForOf.ts]
let array: { x: number, y: string }[];
for (let { x, ...restOf } of array) {
    [x, restOf];
}
let xx: number;
let rrestOff: { y: string };
for ({ x: xx, ...rrestOff } of array ) {
    [xx, rrestOff];
}
for (const norest of array.map(a => ({ ...a, x: 'a string' }))) {
    [norest.x, norest.y];
    // x is now a string. who knows why.
}


//// [objectRestForOf.js]
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
let array;
for (let _a of array) {
    let { x } = _a, restOf = __rest(_a, ["x"]);
    [x, restOf];
}
let xx;
let rrestOff;
for (let _b of array) {
    ({ x: xx } = _b, rrestOff = __rest(_b, ["x"]));
    [xx, rrestOff];
}
for (const norest of array.map(a => (Object.assign(Object.assign({}, a), { x: 'a string' })))) {
    [norest.x, norest.y];
    // x is now a string. who knows why.
}
