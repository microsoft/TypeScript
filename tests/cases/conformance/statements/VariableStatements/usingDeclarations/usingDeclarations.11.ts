// @target: es5
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true

class A {}
class C1 extends A {
    constructor() {
        using x = null;
        super();
    }
}
class C2 extends A {
    constructor() {
        super();
        using x = null;
    }
}
class C3 extends A {
    y = 1;
    constructor() {
        using x = null;
        super();
    }
}
class C4 extends A {
    constructor(public y: number) {
        using x = null;
        super();
    }
}
class C5 extends A {
    z = 1;
    constructor(public y: number) {
        using x = null;
        super();
    }
}
