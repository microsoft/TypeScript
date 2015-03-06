//@target: ES6
//@declaration: true
class C {
    static [Symbol.iterator] = 0;
    static [Symbol.toPrimitive]() { }
    static get [Symbol.isRegExp]() { return ""; }
    static set [Symbol.isRegExp](x) { }
}