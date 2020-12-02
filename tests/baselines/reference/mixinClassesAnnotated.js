//// [mixinClassesAnnotated.ts]
type Constructor<T> = new(...args: any[]) => T;

class Base {
    constructor(public x: number, public y: number) {}
}

class Derived extends Base {
    constructor(x: number, y: number, public z: number) {
        super(x, y);
    }
}

interface Printable {
    print(): void;
}

const Printable = <T extends Constructor<Base>>(superClass: T): Constructor<Printable> & { message: string } & T =>
    class extends superClass {
        static message = "hello";
        print() {
            const output = this.x + "," + this.y;
        }
    }

interface Tagged {
    _tag: string;
}

function Tagged<T extends Constructor<{}>>(superClass: T): Constructor<Tagged> & T {
    class C extends superClass {
        _tag: string;
        constructor(...args: any[]) {
            super(...args);
            this._tag = "hello";
        }
    }
    return C;
}

const Thing1 = Tagged(Derived);
const Thing2 = Tagged(Printable(Derived));
Thing2.message;

function f1() {
    const thing = new Thing1(1, 2, 3);
    thing.x;
    thing._tag;
}

function f2() {
    const thing = new Thing2(1, 2, 3);
    thing.x;
    thing._tag;
    thing.print();
}

class Thing3 extends Thing2 {
    constructor(tag: string) {
        super(10, 20, 30);
        this._tag = tag;
    }
    test() {
        this.print();
    }
}


//// [mixinClassesAnnotated.js]
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
var Base = /** @class */ (function () {
    function Base(x, y) {
        this.x = x;
        this.y = y;
    }
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived(x, y, z) {
        var _this = _super.call(this, x, y) || this;
        _this.z = z;
        return _this;
    }
    return Derived;
}(Base));
var Printable = function (superClass) { var _a; return _a = /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.print = function () {
            var output = this.x + "," + this.y;
        };
        return class_1;
    }(superClass)),
    _a.message = "hello",
    _a; };
function Tagged(superClass) {
    var C = /** @class */ (function (_super) {
        __extends(C, _super);
        function C() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this._tag = "hello";
            return _this;
        }
        return C;
    }(superClass));
    return C;
}
var Thing1 = Tagged(Derived);
var Thing2 = Tagged(Printable(Derived));
Thing2.message;
function f1() {
    var thing = new Thing1(1, 2, 3);
    thing.x;
    thing._tag;
}
function f2() {
    var thing = new Thing2(1, 2, 3);
    thing.x;
    thing._tag;
    thing.print();
}
var Thing3 = /** @class */ (function (_super) {
    __extends(Thing3, _super);
    function Thing3(tag) {
        var _this = _super.call(this, 10, 20, 30) || this;
        _this._tag = tag;
        return _this;
    }
    Thing3.prototype.test = function () {
        this.print();
    };
    return Thing3;
}(Thing2));


//// [mixinClassesAnnotated.d.ts]
declare type Constructor<T> = new (...args: any[]) => T;
declare class Base {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
declare class Derived extends Base {
    z: number;
    constructor(x: number, y: number, z: number);
}
interface Printable {
    print(): void;
}
declare const Printable: <T extends Constructor<Base>>(superClass: T) => Constructor<Printable> & {
    message: string;
} & T;
interface Tagged {
    _tag: string;
}
declare function Tagged<T extends Constructor<{}>>(superClass: T): Constructor<Tagged> & T;
declare const Thing1: Constructor<Tagged> & typeof Derived;
declare const Thing2: Constructor<Tagged> & Constructor<Printable> & {
    message: string;
} & typeof Derived;
declare function f1(): void;
declare function f2(): void;
declare class Thing3 extends Thing2 {
    constructor(tag: string);
    test(): void;
}
