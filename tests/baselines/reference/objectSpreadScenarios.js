//// [objectSpreadScenarios.ts]
interface A1 { a: boolean }
interface B1 { b: number };
function override<U>(initial: U, override: U): { ...U, ...U } {
    return { ...initial, ...override };
}
function update<U>(this: { u: { ...U } }, override: U): void {
    this.u = { ...this.u, ...override };
}
function mixin<T, U>(one: T, two: U): { ...T, ...U } {
    return { ...one, ...two };
}
let a1: A1 = { a: true };
let b1: B1 = { b: 101 };
a1 = override(a1, { a: false });
let host = { u: a1, update };
host.update({ a: false });
let mixed = mixin(a1, b1);


//// [objectSpreadScenarios.js]
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
;
function override(initial, override) {
    return __assign({}, initial, override);
}
function update(override) {
    this.u = __assign({}, this.u, override);
}
function mixin(one, two) {
    return __assign({}, one, two);
}
var a1 = { a: true };
var b1 = { b: 101 };
a1 = override(a1, { a: false });
var host = { u: a1, update: update };
host.update({ a: false });
var mixed = mixin(a1, b1);
