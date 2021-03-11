//// [es6ClassTest2.ts]
class BasicMonster {
    constructor(public name: string, public health: number) {

    }

    attack(target) {
      // WScript.Echo("Attacks " + target);
    }

    isAlive = true;
}

var m1 = new BasicMonster("1", 100);
var m2 = new BasicMonster("2", 100);
m1.attack(m2);
m1.health = 0;
console.log((<any>m5.isAlive).toString());

class GetSetMonster {
    constructor(public name: string, private _health: number) {

    }

    attack(target) {
      // WScript.Echo("Attacks " + target);
    }
  // The contextual keyword "get" followed by an identifier and
  // a curly body defines a getter in the same way that "get"
  // defines one in an object literal.
    get isAlive() {
        return this._health > 0;
    }

  // Likewise, "set" can be used to define setters.
    set health(value: number) {
        if (value < 0) {
            throw new Error('Health must be non-negative.')
    }
        this._health = value
  }
}

var m3 = new BasicMonster("1", 100);
var m4 = new BasicMonster("2", 100);
m3.attack(m4);
m3.health = 0;
var x = (<any>m5.isAlive).toString()

class OverloadedMonster {
    constructor(name: string);
    constructor(public name: string, public health?: number) {

    }

    attack();
    attack(a: any);
    attack(target?) {
        //WScript.Echo("Attacks " + target);
    }

    isAlive = true;
}

var m5 = new OverloadedMonster("1");
var m6 = new OverloadedMonster("2");
m5.attack(m6);
m5.health = 0;
var y = (<any>m5.isAlive).toString()

class SplatMonster {
    constructor(...args: string[]) { }
    roar(name: string, ...args: number[]) { }
}


function foo() { return true; }
class PrototypeMonster {
    age: number = 1;
    name: string;
    b = foo();
}

class SuperParent {
    constructor(a: number) {

    }

    b(b: string) {

    }

    c() {

    }
}

class SuperChild extends SuperParent {
    constructor() {
        super(1);
    }

    b() {
        super.b('str');
    }

    c() {
        super.c();
    }
}

class Statics {
    static foo = 1;
    static bar: string;

    static baz() {
        return "";
    }
}

var stat = new Statics();

interface IFoo {
    x: number;
    z: string;
}

class ImplementsInterface implements IFoo {
    public x: number;
    public z: string;
    constructor() {
        this.x = 1;
        this.z = "foo";
    }
}

class Visibility {
    public foo() { }
    private bar() { }
    private x: number;
    public y: number;
    public z: number;
    constructor() {
        this.x = 1;
        this.y = 2;
    }
}

class BaseClassWithConstructor {
    constructor(public x: number, public s: string) { }
}

// used to test codegen
class ChildClassWithoutConstructor extends BaseClassWithConstructor { }


var ccwc = new ChildClassWithoutConstructor(1, "s");



//// [es6ClassTest2.js]
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
var BasicMonster = /** @class */ (function () {
    function BasicMonster(name, health) {
        this.name = name;
        this.health = health;
        this.isAlive = true;
    }
    BasicMonster.prototype.attack = function (target) {
        // WScript.Echo("Attacks " + target);
    };
    return BasicMonster;
}());
var m1 = new BasicMonster("1", 100);
var m2 = new BasicMonster("2", 100);
m1.attack(m2);
m1.health = 0;
console.log(m5.isAlive.toString());
var GetSetMonster = /** @class */ (function () {
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
        enumerable: false,
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
        enumerable: false,
        configurable: true
    });
    return GetSetMonster;
}());
var m3 = new BasicMonster("1", 100);
var m4 = new BasicMonster("2", 100);
m3.attack(m4);
m3.health = 0;
var x = m5.isAlive.toString();
var OverloadedMonster = /** @class */ (function () {
    function OverloadedMonster(name, health) {
        this.name = name;
        this.health = health;
        this.isAlive = true;
    }
    OverloadedMonster.prototype.attack = function (target) {
        //WScript.Echo("Attacks " + target);
    };
    return OverloadedMonster;
}());
var m5 = new OverloadedMonster("1");
var m6 = new OverloadedMonster("2");
m5.attack(m6);
m5.health = 0;
var y = m5.isAlive.toString();
var SplatMonster = /** @class */ (function () {
    function SplatMonster() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    }
    SplatMonster.prototype.roar = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
    };
    return SplatMonster;
}());
function foo() { return true; }
var PrototypeMonster = /** @class */ (function () {
    function PrototypeMonster() {
        this.age = 1;
        this.b = foo();
    }
    return PrototypeMonster;
}());
var SuperParent = /** @class */ (function () {
    function SuperParent(a) {
    }
    SuperParent.prototype.b = function (b) {
    };
    SuperParent.prototype.c = function () {
    };
    return SuperParent;
}());
var SuperChild = /** @class */ (function (_super) {
    __extends(SuperChild, _super);
    function SuperChild() {
        return _super.call(this, 1) || this;
    }
    SuperChild.prototype.b = function () {
        _super.prototype.b.call(this, 'str');
    };
    SuperChild.prototype.c = function () {
        _super.prototype.c.call(this);
    };
    return SuperChild;
}(SuperParent));
var Statics = /** @class */ (function () {
    function Statics() {
    }
    Statics.baz = function () {
        return "";
    };
    Statics.foo = 1;
    return Statics;
}());
var stat = new Statics();
var ImplementsInterface = /** @class */ (function () {
    function ImplementsInterface() {
        this.x = 1;
        this.z = "foo";
    }
    return ImplementsInterface;
}());
var Visibility = /** @class */ (function () {
    function Visibility() {
        this.x = 1;
        this.y = 2;
    }
    Visibility.prototype.foo = function () { };
    Visibility.prototype.bar = function () { };
    return Visibility;
}());
var BaseClassWithConstructor = /** @class */ (function () {
    function BaseClassWithConstructor(x, s) {
        this.x = x;
        this.s = s;
    }
    return BaseClassWithConstructor;
}());
// used to test codegen
var ChildClassWithoutConstructor = /** @class */ (function (_super) {
    __extends(ChildClassWithoutConstructor, _super);
    function ChildClassWithoutConstructor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ChildClassWithoutConstructor;
}(BaseClassWithConstructor));
var ccwc = new ChildClassWithoutConstructor(1, "s");
