//// [tests/cases/conformance/classes/constructorDeclarations/constructorWithExpressionLessReturn.ts] ////

//// [constructorWithExpressionLessReturn.ts]
class C {
    constructor() {
        return;
    }
}

class D {
    x: number;
    constructor() {
        return;
    }
}

class E {
    constructor(public x: number) {
        return;
    }
}

class F<T> {
    constructor(public x: T) {
        return;
    }
}

//// [constructorWithExpressionLessReturn.js]
class C {
    constructor() {
        return;
    }
}
class D {
    constructor() {
        return;
    }
}
class E {
    constructor(x) {
        this.x = x;
        return;
    }
}
class F {
    constructor(x) {
        this.x = x;
        return;
    }
}
