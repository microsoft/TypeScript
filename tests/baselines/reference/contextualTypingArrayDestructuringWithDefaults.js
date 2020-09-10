//// [contextualTypingArrayDestructuringWithDefaults.ts]
type I = { a: "a" };
let [ c0 = {a: "a"} ]: [I?] = [];
let [ x1, c1 = {a: "a"} ]: [number, I?] = [1];
let [ c_ = {a: "a"} ]: I[] = [];

// not a great example, expect an error
function foo() {
    let {length = {a: 1}}: [number] = [1];
    return length;
}


//// [contextualTypingArrayDestructuringWithDefaults.js]
var _a = [][0], c0 = _a === void 0 ? { a: "a" } : _a;
var _b = [1], x1 = _b[0], _c = _b[1], c1 = _c === void 0 ? { a: "a" } : _c;
var _d = [][0], c_ = _d === void 0 ? { a: "a" } : _d;
// not a great example, expect an error
function foo() {
    var _a = [1].length, length = _a === void 0 ? { a: 1 } : _a;
    return length;
}
