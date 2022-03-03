//// [typeOfThisInStaticMembers12.ts]
class C {
    static readonly c: "foo" = "foo"
    static bar =  class Inner {
        static [this.c] = 123;
        [this.c] = 123;
    }
}


//// [typeOfThisInStaticMembers12.js]
var _a, _b;
class C {
    static { this.c = "foo"; }
    static { this.bar = class Inner {
        constructor() {
            this[_b] = 123;
        }
        static { _a = this.c, _b = this.c; }
        static { this[_a] = 123; }
    }; }
}
