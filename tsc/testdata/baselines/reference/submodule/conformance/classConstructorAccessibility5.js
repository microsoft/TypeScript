//// [tests/cases/conformance/classes/constructorDeclarations/classConstructorAccessibility5.ts] ////

//// [classConstructorAccessibility5.ts]
class Base {
    protected constructor() { }
}
class Derived extends Base {
    static make() { new Base() } // ok
}

class Unrelated {
    static fake() { new Base() } // error
}


//// [classConstructorAccessibility5.js]
class Base {
    constructor() { }
}
class Derived extends Base {
    static make() { new Base(); } // ok
}
class Unrelated {
    static fake() { new Base(); } // error
}
