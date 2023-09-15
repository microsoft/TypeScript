//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/typeOfThisInStaticMembers12.ts] ////

//// [typeOfThisInStaticMembers12.ts]
class C {
    static readonly c: "foo" = "foo"
    static bar =  class Inner {
        static [this.c] = 123;
        [this.c] = 123;
    }
}


//// [typeOfThisInStaticMembers12.js]
var _a, _b, _c;
class C {
    static { this.c = "foo"; }
    static { this.bar = (_c = () => { _a = this.c, _b = this.c; },
        class Inner {
                constructor() {
                    this[_b] = 123;
                }
                static { _c(); }
                static { this[_a] = 123; }
            }); }
}
