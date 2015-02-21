//@target: ES6
//@declaration: true
module M {
    interface I { }
    export class C {
        [Symbol.iterator]: I;
        [Symbol.toPrimitive](x: I) { }
        [Symbol.isConcatSpreadable](): I {
            return undefined
        }
        get [Symbol.isRegExp]() { return undefined; }
        set [Symbol.isRegExp](x: I) { }
    }
}