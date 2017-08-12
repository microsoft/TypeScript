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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
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
// Case 1
var Base1 = (function () {
    function Base1() {
    }
    Base1.prototype.foo = function () {
        return "base";
    };
    __names(Base1.prototype, ["foo"]);
    return Base1;
}());
var Sub1 = (function (_super) {
    __extends(Sub1, _super);
    function Sub1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sub1.prototype.bar = function () {
        return "base";
    };
    __names(Sub1.prototype, ["bar"]);
    return Sub1;
}(Base1));
var SubSub1 = (function (_super) {
    __extends(SubSub1, _super);
    function SubSub1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubSub1.prototype.bar = function () {
        return _super.prototype["super"].foo;
    };
    __names(SubSub1.prototype, ["bar"]);
    return SubSub1;
}(Sub1));
// Case 2
var Base2 = (function () {
    function Base2() {
    }
    Base2.prototype.foo = function () {
        return "base";
    };
    __names(Base2.prototype, ["foo"]);
    return Base2;
}());
var SubE2 = (function (_super) {
    __extends(SubE2, _super);
    function SubE2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubE2.prototype.bar = function () {
        return _super.prototype.prototype.foo = null;
    };
    __names(SubE2.prototype, ["bar"]);
    return SubE2;
}(Base2));
// Case 3
var Base3 = (function () {
    function Base3() {
    }
    Base3.prototype.foo = function () {
        return "base";
    };
    __names(Base3.prototype, ["foo"]);
    return Base3;
}());
var SubE3 = (function (_super) {
    __extends(SubE3, _super);
    function SubE3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubE3.prototype.bar = function () {
        return _super.prototype.bar.call(this);
    };
    __names(SubE3.prototype, ["bar"]);
    return SubE3;
}(Base3));
// Case 4
var Base4;
(function (Base4) {
    var Sub4 = (function () {
        function Sub4() {
        }
        Sub4.prototype.x = function () {
            return "hello";
        };
        __names(Sub4.prototype, ["x"]);
        return Sub4;
    }());
    var SubSub4 = (function (_super) {
        __extends(SubSub4, _super);
        function SubSub4() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SubSub4.prototype.x = function () {
            return _super.prototype.x.call(this);
        };
        __names(SubSub4.prototype, ["x"]);
        return SubSub4;
    }(Sub4));
    Base4.SubSub4 = SubSub4;
    var Sub4E = (function () {
        function Sub4E() {
        }
        Sub4E.prototype.x = function () {
            return _super.prototype.x.call(this);
        };
        __names(Sub4E.prototype, ["x"]);
        return Sub4E;
    }());
    Base4.Sub4E = Sub4E;
})(Base4 || (Base4 = {}));
