//// [superCallInNonStaticMethod.ts]
class Doing {
    public instanceMethod() {
    }
}

class Other extends Doing {
    // in instance method
    public instanceMethod() {
        super.instanceMethod();
    }

    // in a lambda inside a instance method
    public lambdaInsideAnInstanceMethod() {
        () => {
            super.instanceMethod();
        }
    }

    // in an object literal inside a instance method
    public objectLiteralInsideAnInstanceMethod() {
        return {
            a: () => {
                super.instanceMethod();
            },
            b: super.instanceMethod()
        };
    }

    // in a getter
    public get accessor() {
        super.instanceMethod();

        return 0;
    }

    // in a setter
    public set accessor(value: number) {
        super.instanceMethod();
    }
    
    constructor() {
        super();
        super.instanceMethod();
    }
    
    public propertyInitializer = super.instanceMethod();
    
    public functionProperty = () => {super.instanceMethod(); };
}


//// [superCallInNonStaticMethod.js]
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
var Doing = /** @class */ (function () {
    function Doing() {
    }
    Doing.prototype.instanceMethod = function () {
    };
    return Doing;
}());
var Other = /** @class */ (function (_super) {
    __extends(Other, _super);
    function Other() {
        var _this = _super.call(this) || this;
        _this.propertyInitializer = _super.prototype.instanceMethod.call(_this);
        _this.functionProperty = function () { _super.prototype.instanceMethod.call(_this); };
        _super.prototype.instanceMethod.call(_this);
        return _this;
    }
    // in instance method
    Other.prototype.instanceMethod = function () {
        _super.prototype.instanceMethod.call(this);
    };
    // in a lambda inside a instance method
    Other.prototype.lambdaInsideAnInstanceMethod = function () {
        var _this = this;
        (function () {
            _super.prototype.instanceMethod.call(_this);
        });
    };
    // in an object literal inside a instance method
    Other.prototype.objectLiteralInsideAnInstanceMethod = function () {
        var _this = this;
        return {
            a: function () {
                _super.prototype.instanceMethod.call(_this);
            },
            b: _super.prototype.instanceMethod.call(this)
        };
    };
    Object.defineProperty(Other.prototype, "accessor", {
        // in a getter
        get: function () {
            _super.prototype.instanceMethod.call(this);
            return 0;
        },
        // in a setter
        set: function (value) {
            _super.prototype.instanceMethod.call(this);
        },
        enumerable: false,
        configurable: true
    });
    return Other;
}(Doing));
