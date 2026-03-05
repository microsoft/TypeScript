//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-outerThisReference.ts] ////

//// [esDecorators-classDeclaration-outerThisReference.ts]
declare let dec: any;

declare let f: any;

// `this` should point to the outer `this` in both cases.
@dec(this)
class A {
    @dec(this)
    b = 2;
}

// `this` should point to the outer `this`, and maintain the correct evaluation order with respect to computed
// property names.

@dec(this)
class B {
    // @ts-ignore
    [f(this)] = 1;

    @dec(this)
    b = 2;

    // @ts-ignore
    [f(this)] = 3;
}

// The `this` transformation should ensure that decorators inside the class body have privileged access to
// private names.
@dec(this)
class C {
    #a = 1;

    @dec(this, (x: C) => x.#a)
    b = 2;
}

//// [esDecorators-classDeclaration-outerThisReference.js]
"use strict";
var _a, _b, _C_a;
// `this` should point to the outer `this` in both cases.
class A {
    constructor() {
        this.b = 2;
    }
}
// `this` should point to the outer `this`, and maintain the correct evaluation order with respect to computed
// property names.
class B {
    constructor() {
        // @ts-ignore
        this[_a] = 1;
        this.b = 2;
        // @ts-ignore
        this[_b] = 3;
    }
}
_a = f(this), _b = f(this);
// The `this` transformation should ensure that decorators inside the class body have privileged access to
// private names.
class C {
    constructor() {
        _C_a.set(this, 1);
        this.b = 2;
    }
}
_C_a = new WeakMap();
