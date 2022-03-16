// @allowJS: true
// @suppressOutputPathCheck: true
// @strictNullChecks: true

// @filename: a.ts
var W: string;

// @filename: b.js
// @ts-check
var W = /** @type {string} */(/** @type {*} */ (4));

var W = /** @type {string} */(4); // Error

/** @type {*} */
var a;

/** @type {string} */
var s;

var a = /** @type {*} */("" + 4);
var s = "" + /** @type {*} */(4);

class SomeBase {
    constructor() {
        this.p = 42;
    }
}
class SomeDerived extends SomeBase {
    constructor() {
        super();
        this.x = 42;
    }
}
class SomeOther {
    constructor() {
        this.q = 42;
    }
}

function SomeFakeClass() {
    /** @type {string|number} */
    this.p = "bar";
}

// Type assertion should check for assignability in either direction
var someBase = new SomeBase();
var someDerived = new SomeDerived();
var someOther = new SomeOther();
var someFakeClass = new SomeFakeClass();

someBase = /** @type {SomeBase} */(someDerived);
someBase = /** @type {SomeBase} */(someBase);
someBase = /** @type {SomeBase} */(someOther); // Error

someDerived = /** @type {SomeDerived} */(someDerived);
someDerived = /** @type {SomeDerived} */(someBase);
someDerived = /** @type {SomeDerived} */(someOther); // Error

someOther = /** @type {SomeOther} */(someDerived); // Error
someOther = /** @type {SomeOther} */(someBase); // Error
someOther = /** @type {SomeOther} */(someOther);

someFakeClass = someBase;
someFakeClass = someDerived;

someBase = someFakeClass; // Error
someBase = /** @type {SomeBase} */(someFakeClass);

// Type assertion cannot be a type-predicate type
/** @type {number | string} */
var numOrStr;
/** @type {string} */
var str;
if(/** @type {numOrStr is string} */(numOrStr === undefined)) { // Error
	str = numOrStr; // Error, no narrowing occurred
}


var asConst1 = /** @type {const} */(1);
var asConst2 = /** @type {const} */({
    x: 1
});