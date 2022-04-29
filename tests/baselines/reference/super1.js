//// [super1.ts]
// Case 1
class Base1 {
    public foo() {
        return "base";
    }
}

class Sub1 extends Base1 {
    public bar() {
        return "base";
    }
}

class SubSub1 extends Sub1 {
    public bar() {
        return super.super.foo;
    }
}

// Case 2
class Base2 {
    public foo() {
        return "base";
    }
}

class SubE2 extends Base2 {
    public bar() {
        return super.prototype.foo = null;
    }
}

// Case 3
class Base3 {
    public foo() {
        return "base";
    }
}

class SubE3 extends Base3 {
    public bar() {
        return super.bar();
    }
}

// Case 4
module Base4 {
    class Sub4 {
        public x(){
            return "hello";
        }
    }
    
    export class SubSub4 extends Sub4{
        public x(){
            return super.x();
        }
    }
    
    export class Sub4E {
        public x() {
            return super.x();
        }
    }
}


//// [super1.js]
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
// Case 1
var Base1 = /** @class */ (function () {
    function Base1() {
    }
    Base1.prototype.foo = function () {
        return "base";
    };
    return Base1;
}());
var Sub1 = /** @class */ (function (_super) {
    __extends(Sub1, _super);
    function Sub1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sub1.prototype.bar = function () {
        return "base";
    };
    return Sub1;
}(Base1));
var SubSub1 = /** @class */ (function (_super) {
    __extends(SubSub1, _super);
    function SubSub1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubSub1.prototype.bar = function () {
        return _super.prototype["super"].foo;
    };
    return SubSub1;
}(Sub1));
// Case 2
var Base2 = /** @class */ (function () {
    function Base2() {
    }
    Base2.prototype.foo = function () {
        return "base";
    };
    return Base2;
}());
var SubE2 = /** @class */ (function (_super) {
    __extends(SubE2, _super);
    function SubE2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubE2.prototype.bar = function () {
        return _super.prototype.prototype.foo = null;
    };
    return SubE2;
}(Base2));
// Case 3
var Base3 = /** @class */ (function () {
    function Base3() {
    }
    Base3.prototype.foo = function () {
        return "base";
    };
    return Base3;
}());
var SubE3 = /** @class */ (function (_super) {
    __extends(SubE3, _super);
    function SubE3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubE3.prototype.bar = function () {
        return _super.prototype.bar.call(this);
    };
    return SubE3;
}(Base3));
// Case 4
var Base4;
(function (Base4) {
    var Sub4 = /** @class */ (function () {
        function Sub4() {
        }
        Sub4.prototype.x = function () {
            return "hello";
        };
        return Sub4;
    }());
    var SubSub4 = /** @class */ (function (_super) {
        __extends(SubSub4, _super);
        function SubSub4() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SubSub4.prototype.x = function () {
            return _super.prototype.x.call(this);
        };
        return SubSub4;
    }(Sub4));
    Base4.SubSub4 = SubSub4;
    var Sub4E = /** @class */ (function () {
        function Sub4E() {
        }
        Sub4E.prototype.x = function () {
            return _super.prototype.x.call(this);
        };
        return Sub4E;
    }());
    Base4.Sub4E = Sub4E;
})(Base4 || (Base4 = {}));
