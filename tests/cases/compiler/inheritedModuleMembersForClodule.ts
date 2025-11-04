class C {
    static foo(): string {
        return "123";
    }
}

class D extends C {
}

namespace D {
    export function foo(): number {
        return 0;
    };
}

class E extends D {
    static bar() {
        return this.foo();
    }
}
