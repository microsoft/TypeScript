//// [tests/cases/conformance/override/override3.ts] ////

//// [override3.ts]
declare class B {
    foo(): void
    bar(): void
}

declare class D extends B {
    foo (): void;
    override bar (): void;
}

class DB extends B {
    override foo(): void {}
    override bar(): void {}
}

class DD extends D {
    override foo(): void {}
    override bar(): void {}
}

class EB extends D {
    foo(): void {}
    override bar(): void {}
}


//// [override3.js]
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
var DB = /** @class */ (function (_super) {
    __extends(DB, _super);
    function DB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DB.prototype.foo = function () { };
    DB.prototype.bar = function () { };
    return DB;
}(B));
var DD = /** @class */ (function (_super) {
    __extends(DD, _super);
    function DD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DD.prototype.foo = function () { };
    DD.prototype.bar = function () { };
    return DD;
}(D));
var EB = /** @class */ (function (_super) {
    __extends(EB, _super);
    function EB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EB.prototype.foo = function () { };
    EB.prototype.bar = function () { };
    return EB;
}(D));


//// [override3.d.ts]
declare class B {
    foo(): void;
    bar(): void;
}
declare class D extends B {
    foo(): void;
    bar(): void;
}
declare class DB extends B {
    foo(): void;
    bar(): void;
}
declare class DD extends D {
    foo(): void;
    bar(): void;
}
declare class EB extends D {
    foo(): void;
    bar(): void;
}
