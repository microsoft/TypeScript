//// [tests/cases/conformance/jsdoc/jsdocTypeTagCast.ts] ////

//// [a.ts]
var W: string;

//// [b.js]
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




//// [a.js]
var W;
//// [b.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// @ts-check
var W = ((4));
var W = (4); // Error
/** @type {*} */
var a;
/** @type {string} */
var s;
var a = ("" + 4);
var s = "" + (4);
var SomeBase = (function () {
    function SomeBase() {
        this.p = 42;
    }
    return SomeBase;
}());
var SomeDerived = (function (_super) {
    __extends(SomeDerived, _super);
    function SomeDerived() {
        var _this = _super.call(this) || this;
        _this.x = 42;
        return _this;
    }
    return SomeDerived;
}(SomeBase));
var SomeOther = (function () {
    function SomeOther() {
        this.q = 42;
    }
    return SomeOther;
}());
function SomeFakeClass() {
    /** @type {string|number} */
    this.p = "bar";
}
// Type assertion should check for assignability in either direction
var someBase = new SomeBase();
var someDerived = new SomeDerived();
var someOther = new SomeOther();
var someFakeClass = new SomeFakeClass();
someBase = (someDerived);
someBase = (someBase);
someBase = (someOther); // Error
someDerived = (someDerived);
someDerived = (someBase);
someDerived = (someOther); // Error
someOther = (someDerived); // Error
someOther = (someBase); // Error
someOther = (someOther);
someFakeClass = someBase;
someFakeClass = someDerived;
someBase = someFakeClass; // Error
someBase = (someFakeClass);
// Type assertion cannot be a type-predicate type
/** @type {number | string} */
var numOrStr;
/** @type {string} */
var str;
if ((numOrStr === undefined)) {
    str = numOrStr; // Error, no narrowing occurred
}
