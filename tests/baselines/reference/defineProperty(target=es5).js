//// [tests/cases/conformance/classes/propertyMemberDeclarations/defineProperty.ts] ////

//// [defineProperty.ts]
var x: "p" = "p"
class A {
    a = this.y
    b
    public c;
    ["computed"] = 13
    ;[x] = 14
    m() { }
    constructor(public readonly y: number) { }
    z = this.y
    declare notEmitted;
}
class B {
    public a;
}
class C extends B {
    declare public a;
    z = this.ka
    constructor(public ka: number) {
        super()
    }
    ki = this.ka
}


//// [defineProperty.js]
var _a;
var x = "p";
class A {
    m() { }
    constructor(y) {
        Object.defineProperty(this, "y", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: y
        });
        Object.defineProperty(this, "a", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.y
        });
        Object.defineProperty(this, "b", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "c", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "computed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 13
        });
        Object.defineProperty(this, _a, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 14
        });
        Object.defineProperty(this, "z", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.y
        });
    }
}
_a = x;
class B {
    constructor() {
        Object.defineProperty(this, "a", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
}
class C extends B {
    constructor(ka) {
        super();
        Object.defineProperty(this, "ka", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ka
        });
        Object.defineProperty(this, "z", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.ka
        });
        Object.defineProperty(this, "ki", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.ka
        });
    }
}
