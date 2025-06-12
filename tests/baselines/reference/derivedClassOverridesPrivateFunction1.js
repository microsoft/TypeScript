//// [tests/cases/compiler/derivedClassOverridesPrivateFunction1.ts] ////

//// [derivedClassOverridesPrivateFunction1.ts]
class BaseClass {
    constructor() {
        this._init();
    }
    private _init() {
    }
}
class DerivedClass extends BaseClass {
    constructor() {
        super();
    }
    private _init() {
    }
}
new DerivedClass();

//// [derivedClassOverridesPrivateFunction1.js]
class BaseClass {
    constructor() {
        this._init();
    }
    _init() {
    }
}
class DerivedClass extends BaseClass {
    constructor() {
        super();
    }
    _init() {
    }
}
new DerivedClass();
