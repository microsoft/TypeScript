//// [es6ClassTest2.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BasicMonster = (function () {
    function BasicMonster(name, health) {
        this.name = name;
        this.health = health;
        this.isAlive = true;
    }
    BasicMonster.prototype.attack = function (target) {
        // WScript.Echo("Attacks " + target);
    };
    return BasicMonster;
})();

var m1 = new BasicMonster("1", 100);
var m2 = new BasicMonster("2", 100);
m1.attack(m2);
m1.health = 0;
console.log(m5.isAlive.toString());

var GetSetMonster = (function () {
    function GetSetMonster(name, _health) {
        this.name = name;
        this._health = _health;
    }
    GetSetMonster.prototype.attack = function (target) {
        // WScript.Echo("Attacks " + target);
    };

    Object.defineProperty(GetSetMonster.prototype, "isAlive", {
        // The contextual keyword "get" followed by an identifier and
        // a curly body defines a getter in the same way that "get"
        // defines one in an object literal.
        get: function () {
            return this._health > 0;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(GetSetMonster.prototype, "health", {
        // Likewise, "set" can be used to define setters.
        set: function (value) {
            if (value < 0) {
                throw new Error('Health must be non-negative.');
            }
            this._health = value;
        },
        enumerable: true,
        configurable: true
    });
    return GetSetMonster;
})();

var m3 = new BasicMonster("1", 100);
var m4 = new BasicMonster("2", 100);
m3.attack(m4);
m3.health = 0;
var x = m5.isAlive.toString();

var OverloadedMonster = (function () {
    function OverloadedMonster(name, health) {
        this.name = name;
        this.health = health;
        this.isAlive = true;
    }
    OverloadedMonster.prototype.attack = function (target) {
        //WScript.Echo("Attacks " + target);
    };
    return OverloadedMonster;
})();

var m5 = new OverloadedMonster("1");
var m6 = new OverloadedMonster("2");
m5.attack(m6);
m5.health = 0;
var y = m5.isAlive.toString();

var SplatMonster = (function () {
    function SplatMonster() {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            args[_i] = arguments[_i + 0];
        }
    }
    SplatMonster.prototype.roar = function (name) {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            args[_i] = arguments[_i + 1];
        }
    };
    return SplatMonster;
})();

function foo() {
    return true;
}
var PrototypeMonster = (function () {
    function PrototypeMonster() {
        this.age = 1;
        this.b = foo();
    }
    return PrototypeMonster;
})();

var SuperParent = (function () {
    function SuperParent(a) {
    }
    SuperParent.prototype.b = function (b) {
    };

    SuperParent.prototype.c = function () {
    };
    return SuperParent;
})();

var SuperChild = (function (_super) {
    __extends(SuperChild, _super);
    function SuperChild() {
        _super.call(this, 1);
    }
    SuperChild.prototype.b = function () {
        _super.prototype.b.call(this, 'str');
    };

    SuperChild.prototype.c = function () {
        _super.prototype.c.call(this);
    };
    return SuperChild;
})(SuperParent);

var Statics = (function () {
    function Statics() {
    }
    Statics.baz = function () {
        return "";
    };
    Statics.foo = 1;
    return Statics;
})();

var stat = new Statics();

var ImplementsInterface = (function () {
    function ImplementsInterface() {
        this.x = 1;
        this.z = "foo";
    }
    return ImplementsInterface;
})();

var Visibility = (function () {
    function Visibility() {
        this.x = 1;
        this.y = 2;
    }
    Visibility.prototype.foo = function () {
    };
    Visibility.prototype.bar = function () {
    };
    return Visibility;
})();

var BaseClassWithConstructor = (function () {
    function BaseClassWithConstructor(x, s) {
        this.x = x;
        this.s = s;
    }
    return BaseClassWithConstructor;
})();

// used to test codegen
var ChildClassWithoutConstructor = (function (_super) {
    __extends(ChildClassWithoutConstructor, _super);
    function ChildClassWithoutConstructor() {
        _super.apply(this, arguments);
    }
    return ChildClassWithoutConstructor;
})(BaseClassWithConstructor);

var ccwc = new ChildClassWithoutConstructor(1, "s");
