//// [apparentTypeSupertype.ts]
// subtype checks use the apparent type of the target type
// S is a subtype of a type T, and T is a supertype of S, if one of the following is true, where S' denotes the apparent type (section 3.8.1) of S:

class Base {
    x: string;
}

// is String (S) a subtype of U extends String (T)? Would only be true if we used the apparent type of U (T)
class Derived<U extends String> extends Base { // error
    x: U;
}

//// [apparentTypeSupertype.js]
// subtype checks use the apparent type of the target type
// S is a subtype of a type T, and T is a supertype of S, if one of the following is true, where S' denotes the apparent type (section 3.8.1) of S:
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    function Base() {
    }
    return Base;
}());
// is String (S) a subtype of U extends String (T)? Would only be true if we used the apparent type of U (T)
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        _super.apply(this, arguments);
    }
    return Derived;
}(Base));
