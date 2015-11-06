//// [structExtendsItself.ts]
struct C extends C { } // error

// struct D<T> extends D<T> { } //  error

// struct E<T> extends E<string> { } // error

//// [structExtendsItself.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
    return C;
})();
 // error
 // error
// struct D<T> extends D<T> { } //  error
// struct E<T> extends E<string> { } // error 
