//// [typeOfThisInStructMemberFunctions.ts]
// doc 4.2
// In the body of a static member function declaration, the type of this is the constructor
// function type.
// ok
struct C {
    foo() {
        var r = this;
    }

    static bar() {
        var r2 = this;
    }
}

/* struct D<T> {
    x: T;
    foo() {
        var r = this;
    }

    static bar() {
        var r2 = this;
    }
}

struct E<T extends Date> {
    x: T;
    foo() {
        var r = this;
    }

    static bar() {
        var r2 = this;
    }
} */

//// [typeOfThisInStructMemberFunctions.js]
// doc 4.2
// In the body of a static member function declaration, the type of this is the constructor
// function type.
// ok
var C = (function () {
    var _C = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function C() {
        var obj = new _C();
        _ctor.call(obj);
        return obj;
    }
    C._TO = _C;
    _C.prototype.foo = function () {
        var r = this;
    };
    _C.bar = function () {
        var r2 = this;
    };
    return C;
})();
/* struct D<T> {
    x: T;
    foo() {
        var r = this;
    }

    static bar() {
        var r2 = this;
    }
}

struct E<T extends Date> {
    x: T;
    foo() {
        var r = this;
    }

    static bar() {
        var r2 = this;
    }
} */ 
