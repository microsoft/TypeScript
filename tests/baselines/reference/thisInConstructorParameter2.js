//// [tests/cases/compiler/thisInConstructorParameter2.ts] ////

//// [thisInConstructorParameter2.ts]
class P {
    x = this;
    static y = this;

    constructor(public z = this, zz = this, zzz = (p = this) => this) {
        zzz = (p = this) => this;
    }

    foo(zz = this) { zz.x; }
    static bar(zz = this) { zz.y; }
}

//// [thisInConstructorParameter2.js]
let P = (() => {
    var _a;
    class P {
        constructor(z = this, zz = this, zzz = (p = this) => this) {
            this.z = z;
            this.x = this;
            zzz = (p = this) => this;
        }
        foo(zz = this) { zz.x; }
        static bar(zz = this) { zz.y; }
    }
    _a = P;
    P.y = _a;
    return P;
})();
