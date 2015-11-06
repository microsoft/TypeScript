//// [structInstanceTypeIsAssignableToBaseType.ts]
// doc 1.1
// Because struct uses nominal typing, the instance type of the declared struct doesn’t need to be
// assignable to the base type reference. However, member variables override is not allowed.
// ok

struct C {
	foo: string;
	thing(): string {
		return "1";
	}
}

struct D extends C {
	thing(): number {
		return 1;  // ok
	}
}

var c: C;
var d: D;
c = d;

//// [structInstanceTypeIsAssignableToBaseType.js]
// doc 1.1
// Because struct uses nominal typing, the instance type of the declared struct doesn’t need to be
// assignable to the base type reference. However, member variables override is not allowed.
// ok
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function () {
    var _C = new TypedObject.StructType({
        foo: TypedObject.string,
    });
    function _ctor() {
    }
    function C() {
        var obj = new _C();
        _ctor.call(obj);
        return obj;
    }
    C._TO = _C;
    _C.prototype.thing = function () {
        return "1";
    };
    return C;
})();
var D = (function () {
    var _D = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function D() {
        var obj = new _D();
        _ctor.call(obj);
        return obj;
    }
    D._TO = _D;
    _D.prototype.thing = function () {
        return 1; // ok
    };
    return D;
})();
var c;
var d;
c = d;
