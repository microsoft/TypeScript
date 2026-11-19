//// [tests/cases/conformance/classes/propertyMemberDeclarations/declarePropertyRedeclaration.ts] ////

//// [declarePropertyRedeclaration.ts]
class Base {
    b: number = 1;
}

class Plain extends Base {
    d = this.b;
}

class Narrowed extends Base {
    declare b: 1 | 2;
    d = this.b;
}

class Redeclared extends Base {
    b: number;
    d = this.b;

    constructor() {
        super();
        this.b = 2;
    }
}

class Own {
    d = this.b;
    b = 1;
}

// An ambient global has no parent class, so reading it in a static field
// initializer must not crash the compiler. The access is still reported,
// because the static initializer runs at class definition time.
class AmbientGlobalStatic {
    static x = globalThis.v;
}

declare var v: number;

// The same access from an instance field initializer is fine, because the
// initializer runs at construction time, after the module has evaluated.
class AmbientGlobalInstance {
    x = globalThis.w;
}

declare var w: number;

// A static declaration must not be exempted: the ancestor check only looks
// at the base class's instance properties, and there is no inherited static
// b here, so Derived.d is undefined at runtime.
class StaticDeclared extends Base {
    static d = this.b;
    declare static b: number;
}

// A static field reading an inherited static property is fine.
class StaticBase {
    static b = 1;
}

class StaticDerived extends StaticBase {
    static d = this.b;
}


//// [declarePropertyRedeclaration.js]
"use strict";
class Base {
    b = 1;
}
class Plain extends Base {
    d = this.b;
}
class Narrowed extends Base {
    d = this.b;
}
class Redeclared extends Base {
    b;
    d = this.b;
    constructor() {
        super();
        this.b = 2;
    }
}
class Own {
    d = this.b;
    b = 1;
}
// An ambient global has no parent class, so reading it in a static field
// initializer must not crash the compiler. The access is still reported,
// because the static initializer runs at class definition time.
class AmbientGlobalStatic {
    static x = globalThis.v;
}
// The same access from an instance field initializer is fine, because the
// initializer runs at construction time, after the module has evaluated.
class AmbientGlobalInstance {
    x = globalThis.w;
}
// A static declaration must not be exempted: the ancestor check only looks
// at the base class's instance properties, and there is no inherited static
// b here, so Derived.d is undefined at runtime.
class StaticDeclared extends Base {
    static d = this.b;
}
// A static field reading an inherited static property is fine.
class StaticBase {
    static b = 1;
}
class StaticDerived extends StaticBase {
    static d = this.b;
}
