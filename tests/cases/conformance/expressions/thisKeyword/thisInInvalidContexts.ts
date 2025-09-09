class BaseErrClass {
    constructor(t: any) { }
}

class ClassWithNoInitializer extends BaseErrClass {
    t;
    //'this' in optional super call
    constructor() {
        super(this); // Error
    }
}

class ClassWithInitializer extends BaseErrClass {
    t = 4;
    //'this' in required super call
    constructor() {
        super(this); // Error
    }
}

namespace M {
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

