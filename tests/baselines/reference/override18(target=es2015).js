//// [override18.ts]
class A {
    foo?: string;
}

class B extends A {
    override foo = "string";
}


//// [override18.js]
class A {
    constructor() {
        Object.defineProperty(this, "foo", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
}
class B extends A {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "foo", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "string"
        });
    }
}
