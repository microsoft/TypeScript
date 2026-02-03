//// [tests/cases/conformance/internalModules/moduleBody/moduleWithStatementsOfEveryKind.ts] ////

//// [moduleWithStatementsOfEveryKind.ts]
module A {
    class A { s: string }
    class AA<T> { s: T }
    interface I { id: number }

    class B extends AA<string> implements I { id: number }
    class BB<T> extends A {
        id: number;
    }

    module Module {
        class A { s: string }
    }
    enum Color { Blue, Red }
    var x = 12;
    function F(s: string): number {
        return 2;
    }
    var array: I[] = null;
    var fn = (s: string) => {
        return 'hello ' + s;
    }
    var ol = { s: 'hello', id: 2, isvalid: true };

    declare class DC {
        static x: number;
    }
}

module Y {
    export class A { s: string }
    export class AA<T> { s: T }
    export interface I { id: number }

    export class B extends AA<string> implements I { id: number }
    export class BB<T> extends A {
        id: number;
    }

    export module Module {
        class A { s: string }
    }
    export enum Color { Blue, Red }
    export var x = 12;
    export function F(s: string): number {
        return 2;
    }
    export var array: I[] = null;
    export var fn = (s: string) => {
        return 'hello ' + s;
    }
    export var ol = { s: 'hello', id: 2, isvalid: true };

    export declare class DC {
        static x: number;
    }
}


//// [moduleWithStatementsOfEveryKind.js]
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
var A;
(function (A_1) {
    var A = /** @class */ (function () {
        function A() {
        }
        return A;
    }());
    var AA = /** @class */ (function () {
        function AA() {
        }
        return AA;
    }());
    var B = /** @class */ (function (_super) {
        __extends(B, _super);
        function B() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return B;
    }(AA));
    var BB = /** @class */ (function (_super) {
        __extends(BB, _super);
        function BB() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BB;
    }(A));
    var Module;
    (function (Module) {
        var A = /** @class */ (function () {
            function A() {
            }
            return A;
        }());
    })(Module || (Module = {}));
    var Color;
    (function (Color) {
        Color[Color["Blue"] = 0] = "Blue";
        Color[Color["Red"] = 1] = "Red";
    })(Color || (Color = {}));
    var x = 12;
    function F(s) {
        return 2;
    }
    var array = null;
    var fn = function (s) {
        return 'hello ' + s;
    };
    var ol = { s: 'hello', id: 2, isvalid: true };
})(A || (A = {}));
var Y;
(function (Y) {
    var A = /** @class */ (function () {
        function A() {
        }
        return A;
    }());
    Y.A = A;
    var AA = /** @class */ (function () {
        function AA() {
        }
        return AA;
    }());
    Y.AA = AA;
    var B = /** @class */ (function (_super) {
        __extends(B, _super);
        function B() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return B;
    }(AA));
    Y.B = B;
    var BB = /** @class */ (function (_super) {
        __extends(BB, _super);
        function BB() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BB;
    }(A));
    Y.BB = BB;
    var Module;
    (function (Module) {
        var A = /** @class */ (function () {
            function A() {
            }
            return A;
        }());
    })(Module = Y.Module || (Y.Module = {}));
    var Color;
    (function (Color) {
        Color[Color["Blue"] = 0] = "Blue";
        Color[Color["Red"] = 1] = "Red";
    })(Color = Y.Color || (Y.Color = {}));
    Y.x = 12;
    function F(s) {
        return 2;
    }
    Y.F = F;
    Y.array = null;
    Y.fn = function (s) {
        return 'hello ' + s;
    };
    Y.ol = { s: 'hello', id: 2, isvalid: true };
})(Y || (Y = {}));
