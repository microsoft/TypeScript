//@target: ES6
//@declaration: true
class C {
    get [Symbol.isRegExp]() { return ""; }
    get [Symbol.toStringTag]() { return ""; }
}