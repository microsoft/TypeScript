//// [tests/cases/compiler/classExtendsNull.ts] ////

//// [classExtendsNull.ts]
class C extends null {
    constructor() {
        super();
        return Object.create(null);
    }
}

class D extends null {
    constructor() {
        return Object.create(null);
    }
}

//// [classExtendsNull.js]
class C extends null {
    constructor() {
        super();
        return Object.create(null);
    }
}
class D extends null {
    constructor() {
        return Object.create(null);
    }
}
