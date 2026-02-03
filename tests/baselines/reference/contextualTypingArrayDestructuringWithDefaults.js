//// [tests/cases/compiler/contextualTypingArrayDestructuringWithDefaults.ts] ////

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
let [c0 = { a: "a" }] = [];
let [x1, c1 = { a: "a" }] = [1];
let [c_ = { a: "a" }] = [];
// not a great example, expect an error
function foo() {
    let { length = { a: 1 } } = [1];
    return length;
}
