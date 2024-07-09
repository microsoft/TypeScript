//@target: ES6
//@declaration: true
class C {
    get [Symbol.toPrimitive]() { return ""; }
    set [Symbol.toPrimitive](x) { }
}