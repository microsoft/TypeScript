//// [tests/cases/conformance/classes/constructorDeclarations/constructorWithAssignableReturnExpression.ts] ////

//// [constructorWithAssignableReturnExpression.ts]
// a class constructor may return an expression, it must be assignable to the class instance type to be valid

class C {
    constructor() {
        return 1;
    }
}

class D {
    x: number;
    constructor() {
        return 1; // error
    }
}

class E {
    x: number;
    constructor() {
        return { x: 1 };
    }
}

class F<T> {
    x: T;
    constructor() {
        return { x: 1 }; // error
    }
}

class G<T> {
    x: T;
    constructor() {
        return { x: <T>null };
    }
}

//// [constructorWithAssignableReturnExpression.js]
// a class constructor may return an expression, it must be assignable to the class instance type to be valid
class C {
    constructor() {
        return 1;
    }
}
class D {
    x;
    constructor() {
        return 1; // error
    }
}
class E {
    x;
    constructor() {
        return { x: 1 };
    }
}
class F {
    x;
    constructor() {
        return { x: 1 }; // error
    }
}
class G {
    x;
    constructor() {
        return { x: null };
    }
}
