//// [infinitelyExpandingTypesNonGenericBase.ts]
class Functionality<V> {
    property: Options<V>;
}

class Base {
}

class A<T> extends Base {
    options: Options<Functionality<T>[]>;
}

interface OptionsBase<T> {
    Options: Options<T>;
}

interface Options<T> extends OptionsBase<T> {
}


function o(type: new () => Base) {
}

o(A);


//// [infinitelyExpandingTypesNonGenericBase.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Functionality = (function () {
    function Functionality() {
    }
    return Functionality;
})();
var Base = (function () {
    function Base() {
    }
    return Base;
})();
var A = (function (_super) {
    __extends(A, _super);
    function A() {
        _super.apply(this, arguments);
    }
    return A;
})(Base);
function o(type) {
}
o(A);
