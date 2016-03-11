interface Constructed {
    getThis(): this;
}

interface Constructor {
    new(): Constructed;
}

declare function getConstructor(v: number): Constructor;
class C extends getConstructor(42) {
    f() {}
}

new C().getThis().f();