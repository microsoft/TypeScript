//@target: ES6
//@declaration: true
class C {
    get [Symbol.isRegExp]() { return ""; }
    set [Symbol.isRegExp](x) { }
}