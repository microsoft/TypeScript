//// [super2.ts]
// Case 5
class Base5 {
    public x() {
        return "BaseX";
    }
    
    public y() {
        return "BaseY";
    }
}

class Sub5 extends Base5 {
    public x() {
        return "SubX";
    }
}

class SubSub5 extends Sub5 {
    public x() {
        return super.x();
    }
    public y() {
        return super.y();
    }
}

// Case 6
class Base6 {
    public x() {
        return "BaseX";
    }
}

class Sub6 extends Base6 {
    public y() {
        return "SubY";
    }
}

class SubSub6 extends Sub6 {
    public y() {
        return super.y();
    }
}


var results1 = new SubSub5();
var results2 = new SubSub6();
results1.x() + results1.y() + results2.y();


//// [super2.js]
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
// Case 5
var Base5 = /** @class */ (function () {
    function Base5() {
    }
    Base5.prototype.x = function () {
        return "BaseX";
    };
    Base5.prototype.y = function () {
        return "BaseY";
    };
    return Base5;
}());
var Sub5 = /** @class */ (function (_super) {
    __extends(Sub5, _super);
    function Sub5() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sub5.prototype.x = function () {
        return "SubX";
    };
    return Sub5;
}(Base5));
var SubSub5 = /** @class */ (function (_super) {
    __extends(SubSub5, _super);
    function SubSub5() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubSub5.prototype.x = function () {
        return _super.prototype.x.call(this);
    };
    SubSub5.prototype.y = function () {
        return _super.prototype.y.call(this);
    };
    return SubSub5;
}(Sub5));
// Case 6
var Base6 = /** @class */ (function () {
    function Base6() {
    }
    Base6.prototype.x = function () {
        return "BaseX";
    };
    return Base6;
}());
var Sub6 = /** @class */ (function (_super) {
    __extends(Sub6, _super);
    function Sub6() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sub6.prototype.y = function () {
        return "SubY";
    };
    return Sub6;
}(Base6));
var SubSub6 = /** @class */ (function (_super) {
    __extends(SubSub6, _super);
    function SubSub6() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubSub6.prototype.y = function () {
        return _super.prototype.y.call(this);
    };
    return SubSub6;
}(Sub6));
var results1 = new SubSub5();
var results2 = new SubSub6();
results1.x() + results1.y() + results2.y();
