//// [tests/cases/conformance/classes/propertyMemberDeclarations/accessorsOverrideProperty6.ts] ////

//// [accessorsOverrideProperty6.ts]
class A {
    p = 'yep'
}
class B extends A {
    get p() { return 'oh no' } // error
}
class C {
   p = 101
}
class D extends C {
     _secret = 11
    get p() { return this._secret } // error
    set p(value) { this._secret = value } // error
}


//// [accessorsOverrideProperty6.js]
class A {
    constructor() {
        this.p = 'yep';
    }
}
class B extends A {
    get p() { return 'oh no'; } // error
}
class C {
    constructor() {
        this.p = 101;
    }
}
class D extends C {
    constructor() {
        super(...arguments);
        this._secret = 11;
    }
    get p() { return this._secret; } // error
    set p(value) { this._secret = value; } // error
}
