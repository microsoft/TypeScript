//// [tests/cases/conformance/expressions/thisKeyword/thisInInvalidContextsExternalModule.ts] ////

//// [thisInInvalidContextsExternalModule.ts]
class BaseErrClass {
    constructor(t: any) { }
}

class ClassWithNoInitializer extends BaseErrClass {
    t;
    //'this' in optional super call
    constructor() {
        super(this); // error: "super" has to be called before "this" accessing
    }
}

class ClassWithInitializer extends BaseErrClass {
    t = 4;
    //'this' in required super call
    constructor() {
        super(this); // Error
    }
}

module M {
    //'this' in module variable
    var x = this; // Error
}

//'this' as type parameter constraint
// function fn<T extends this >() { } // Error

//'this' as a type argument
function genericFunc<T>(x: T) { }
genericFunc<this>(undefined);  // Should be an error

class ErrClass3 extends this {

}

//'this' as a computed enum value
enum SomeEnum {
    A = this, // Should not be allowed
    B = this.spaaaace // Also should not be allowed
}

export = this; // Should be an error

//// [thisInInvalidContextsExternalModule.js]
"use strict";
class BaseErrClass {
    constructor(t) { }
}
class ClassWithNoInitializer extends BaseErrClass {
    t;
    constructor() {
        super(this);
    }
}
class ClassWithInitializer extends BaseErrClass {
    t = 4;
    constructor() {
        super(this);
    }
}
var M;
(function (M) {
    var x = this;
})(M || (M = {}));
function genericFunc(x) { }
genericFunc(undefined);
class ErrClass3 extends this {
}
var SomeEnum;
(function (SomeEnum) {
    SomeEnum["A"] = this;
    if (typeof SomeEnum.A !== "string") SomeEnum[SomeEnum.A] = "A";
    SomeEnum["B"] = this.spaaaace;
    if (typeof SomeEnum.B !== "string") SomeEnum[SomeEnum.B] = "B";
})(SomeEnum || (SomeEnum = {}));
module.exports = this;
