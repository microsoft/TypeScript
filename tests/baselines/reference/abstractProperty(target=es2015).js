//// [abstractProperty.ts]
abstract class A {
    protected abstract x: string;
    public foo() {
        console.log(this.x);
    }
}

class B extends A {
    protected x = 'B.x';
}

class C extends A {
    protected get x() { return 'C.x' };
}


//// [abstractProperty.js]
class A {
    foo() {
        console.log(this.x);
    }
}
class B extends A {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "x", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'B.x'
        });
    }
}
class C extends A {
    get x() { return 'C.x'; }
    ;
}
