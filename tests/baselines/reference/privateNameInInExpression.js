//// [privateNameInInExpression.ts]
class Foo {
    #field = 1;
    static #staticField = 2;
    #method() {}
    static #staticMethod() {}

    goodRhs(v: any) {
        const a = #field in v;

        const b = #field in v.p1.p2;

        const c = #field in (v as {});

        const d = #field in (v as Foo);

        const e = #field in (v as never);

        for (let f in #field in v as any) { /**/ } // unlikely but valid
    }
    badRhs(v: any) {
        const a = #field in (v as unknown); // Bad - RHS of in must be object type or any

        const b = #fiel in v; // Bad - typo in privateID

        const c = (#field) in v; // Bad - privateID is not an expression on its own

        for (#field in v) { /**/ } // Bad - 'in' not allowed

        for (let d in #field in v) { /**/ } // Bad - rhs of in should be a object/any
    }
    whitespace(v: any) {
        const a = v && /*0*/#field/*1*/
            /*2*/in/*3*/
                /*4*/v/*5*/
    }
    flow(u: unknown, n: never, fb: Foo | Bar, fs: FooSub, b: Bar, fsb: FooSub | Bar, fsfb: Foo | FooSub | Bar) {

        if (typeof u === 'object') {
            if (#field in n) {
                n; // good n is never
            }

            if (#field in u) {
                u; // good u is Foo
            } else {
                u; // good u is object | null
            }

            if (u !== null) {
                if (#field in u) {
                    u; // good u is Foo
                } else {
                    u; // good u is object
                }

                if (#method in u) {
                    u; // good u is Foo
                }

                if (#staticField in u) {
                    u; // good u is typeof Foo
                }

                if (#staticMethod in u) {
                    u; // good u is typeof Foo
                }
            }
        }

        if (#field in fb) {
            fb; // good fb is Foo
        } else {
            fb; // good fb is Bar
        }

        if (#field in fs) {
            fs; // good fs is FooSub
        } else {
            fs; // good fs is never
        }

        if (#field in b) {
            b; // good b is 'Bar & Foo'
        } else {
            b; // good b is Bar
        }

        if (#field in fsb) {
            fsb; // good fsb is FooSub
        } else {
            fsb; // good fsb is Bar
        }

        if (#field in fsfb) {
            fsfb; // good fsfb is 'Foo | FooSub'
        } else {
            fsfb; // good fsfb is Bar
        }

        class Nested {
            m(v: any) {
                if (#field in v) {
                    v; // good v is Foo
                }
            }
        }
    }
}

class FooSub extends Foo { subTypeOfFoo = true }
class Bar { notFoo = true }

function badSyntax(v: Foo) {
    return #field in v; // Bad - outside of class
}


//// [privateNameInInExpression.js]
"use strict";
class Foo {
    #field = 1;
    static #staticField = 2;
    #method() { }
    static #staticMethod() { }
    goodRhs(v) {
        const a = #field in v;
        const b = #field in v.p1.p2;
        const c = #field in v;
        const d = #field in v;
        const e = #field in v;
        for (let f in #field in v) { /**/ } // unlikely but valid
    }
    badRhs(v) {
        const a = #field in v; // Bad - RHS of in must be object type or any
        const b = #fiel in v; // Bad - typo in privateID
        const c = (#field) in v; // Bad - privateID is not an expression on its own
        for (#field in v) { /**/ } // Bad - 'in' not allowed
        for (let d in #field in v) { /**/ } // Bad - rhs of in should be a object/any
    }
    whitespace(v) {
        const a = v && /*0*/ #field /*1*/
            /*2*/ in /*3*/
                /*4*/ v; /*5*/
    }
    flow(u, n, fb, fs, b, fsb, fsfb) {
        if (typeof u === 'object') {
            if (#field in n) {
                n; // good n is never
            }
            if (#field in u) {
                u; // good u is Foo
            }
            else {
                u; // good u is object | null
            }
            if (u !== null) {
                if (#field in u) {
                    u; // good u is Foo
                }
                else {
                    u; // good u is object
                }
                if (#method in u) {
                    u; // good u is Foo
                }
                if (#staticField in u) {
                    u; // good u is typeof Foo
                }
                if (#staticMethod in u) {
                    u; // good u is typeof Foo
                }
            }
        }
        if (#field in fb) {
            fb; // good fb is Foo
        }
        else {
            fb; // good fb is Bar
        }
        if (#field in fs) {
            fs; // good fs is FooSub
        }
        else {
            fs; // good fs is never
        }
        if (#field in b) {
            b; // good b is 'Bar & Foo'
        }
        else {
            b; // good b is Bar
        }
        if (#field in fsb) {
            fsb; // good fsb is FooSub
        }
        else {
            fsb; // good fsb is Bar
        }
        if (#field in fsfb) {
            fsfb; // good fsfb is 'Foo | FooSub'
        }
        else {
            fsfb; // good fsfb is Bar
        }
        class Nested {
            m(v) {
                if (#field in v) {
                    v; // good v is Foo
                }
            }
        }
    }
}
class FooSub extends Foo {
    subTypeOfFoo = true;
}
class Bar {
    notFoo = true;
}
function badSyntax(v) {
    return #field in v; // Bad - outside of class
}
