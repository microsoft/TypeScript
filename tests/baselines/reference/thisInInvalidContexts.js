//// [thisInInvalidContexts.ts]
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



//// [thisInInvalidContexts.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BaseErrClass = /** @class */ (function () {
    function BaseErrClass(t) {
    }
    return BaseErrClass;
}());
var ClassWithNoInitializer = /** @class */ (function (_super) {
    __extends(ClassWithNoInitializer, _super);
    //'this' in optional super call
    function ClassWithNoInitializer() {
        var _this = _super.call(this, _this) || this;
        return _this;
    }
    return ClassWithNoInitializer;
}(BaseErrClass));
var ClassWithInitializer = /** @class */ (function (_super) {
    __extends(ClassWithInitializer, _super);
    //'this' in required super call
    function ClassWithInitializer() {
        var _this = _super.call(this, _this) || this;
        _this.t = 4;
        return _this;
    }
    return ClassWithInitializer;
}(BaseErrClass));
var M;
(function (M) {
    //'this' in module variable
    var x = this; // Error
})(M || (M = {}));
//'this' as type parameter constraint
// function fn<T extends this >() { } // Error
//'this' as a type argument
function genericFunc(x) { }
genericFunc(undefined); // Should be an error
var ErrClass3 = /** @class */ (function (_super) {
    __extends(ErrClass3, _super);
    function ErrClass3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ErrClass3;
}(this));
//'this' as a computed enum value
var SomeEnum;
(function (SomeEnum) {
    SomeEnum[SomeEnum["A"] = this] = "A";
    SomeEnum[SomeEnum["B"] = this.spaaaace] = "B"; // Also should not be allowed
})(SomeEnum || (SomeEnum = {}));
