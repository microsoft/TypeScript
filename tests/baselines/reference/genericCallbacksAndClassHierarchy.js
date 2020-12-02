//// [genericCallbacksAndClassHierarchy.ts]
module M {
    export interface I<T> {
        subscribe(callback: (newValue: T) => void ): any;
    }
    export class C1<T> {
        public value: I<T>;
    }
    export class A<T> {
        public dummy: any;
    }
    export class B<T> extends C1<A<T>> { }
    export class D<T> {
        _subscribe(viewModel: B<T>): void {
            var f = (newValue: A<T>) => { };

            var v: I<A<T>> = viewModel.value;

            // both of these should work
            v.subscribe(f);
            v.subscribe((newValue: A<T>) => { });
        }
    }
}

//// [genericCallbacksAndClassHierarchy.js]
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
var M;
(function (M) {
    var C1 = /** @class */ (function () {
        function C1() {
        }
        return C1;
    }());
    M.C1 = C1;
    var A = /** @class */ (function () {
        function A() {
        }
        return A;
    }());
    M.A = A;
    var B = /** @class */ (function (_super) {
        __extends(B, _super);
        function B() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return B;
    }(C1));
    M.B = B;
    var D = /** @class */ (function () {
        function D() {
        }
        D.prototype._subscribe = function (viewModel) {
            var f = function (newValue) { };
            var v = viewModel.value;
            // both of these should work
            v.subscribe(f);
            v.subscribe(function (newValue) { });
        };
        return D;
    }());
    M.D = D;
})(M || (M = {}));
