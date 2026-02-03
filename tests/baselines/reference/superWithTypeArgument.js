//// [tests/cases/compiler/superWithTypeArgument.ts] ////

//// [superWithTypeArgument.ts]
class C {
    
}

class D<T> extends C {
    constructor() {
        super<T>();
    }
}

//// [superWithTypeArgument.js]
class C {
}
class D extends C {
    constructor() {
        super();
    }
}
