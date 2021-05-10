//// [override2.ts]
abstract class AB {
    abstract foo(v: string): void;

    abstract bar(v: string): void;
    abstract baz(v: string): void;
}

abstract class AD1 extends AB {

}

abstract class AD2 extends AB {
    abstract foo(v: ''): void // need override?
}

abstract class AD3 extends AB {
    override foo(v: ''): void { } // need override?
    abstract bar(): void;
    baz(): void { }
}

class D4 extends AB {
    override foo(v: ''): void {}
    override bar(v: ''): void {}
    baz(): void { }
}

//// [override2.js]
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
var AB = /** @class */ (function () {
    function AB() {
    }
    return AB;
}());
var AD1 = /** @class */ (function (_super) {
    __extends(AD1, _super);
    function AD1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AD1;
}(AB));
var AD2 = /** @class */ (function (_super) {
    __extends(AD2, _super);
    function AD2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AD2;
}(AB));
var AD3 = /** @class */ (function (_super) {
    __extends(AD3, _super);
    function AD3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AD3.prototype.foo = function (v) { }; // need override?
    AD3.prototype.baz = function () { };
    return AD3;
}(AB));
var D4 = /** @class */ (function (_super) {
    __extends(D4, _super);
    function D4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    D4.prototype.foo = function (v) { };
    D4.prototype.bar = function (v) { };
    D4.prototype.baz = function () { };
    return D4;
}(AB));


//// [override2.d.ts]
declare abstract class AB {
    abstract foo(v: string): void;
    abstract bar(v: string): void;
    abstract baz(v: string): void;
}
declare abstract class AD1 extends AB {
}
declare abstract class AD2 extends AB {
    abstract foo(v: ''): void;
}
declare abstract class AD3 extends AB {
    foo(v: ''): void;
    abstract bar(): void;
    baz(): void;
}
declare class D4 extends AB {
    foo(v: ''): void;
    bar(v: ''): void;
    baz(): void;
}
