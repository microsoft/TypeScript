//// [tests/cases/compiler/performanceComparisonOfStructurallyIdenticalInterfacesWithGenericSignatures.ts] ////

//// [performanceComparisonOfStructurallyIdenticalInterfacesWithGenericSignatures.ts]
export declare type ThenArg<T> = T extends any ? any : T extends PromiseLike<infer U> ? U : T;

export interface InterfaceA<T> {
    filter(callback: (newValue: T, oldValue: T) => boolean): InterfaceA<T>;
    map<D>(callback: (value: T) => D): InterfaceA<D>;
    await<R extends ThenArg<T>>(): InterfaceA<R>;
    awaitLatest<R extends ThenArg<T>>(): InterfaceA<R>;
    awaitOrdered<R extends ThenArg<T>>(): InterfaceA<R>;
    awaitOrdered2<R extends ThenArg<T>>(): InterfaceA<R>;
    awaitOrdered3<R extends ThenArg<T>>(): InterfaceA<R>;
    awaitOrdered4<R extends ThenArg<T>>(): InterfaceA<R>;
    awaitOrdered5<R extends ThenArg<T>>(): InterfaceA<R>;
    awaitOrdered6<R extends ThenArg<T>>(): InterfaceA<R>;
    awaitOrdered7<R extends ThenArg<T>>(): InterfaceA<R>;
    awaitOrdered8<R extends ThenArg<T>>(): InterfaceA<R>;
    awaitOrdered9<R extends ThenArg<T>>(): InterfaceA<R>;
}

export interface InterfaceB<T> extends InterfaceA<T> {
    map<D>(callback: (value: T) => D): InterfaceB<D>;
    await<R extends ThenArg<T>>(): InterfaceB<R>;
    awaitLatest<R extends ThenArg<T>>(): InterfaceB<R>;
    awaitOrdered<R extends ThenArg<T>>(): InterfaceB<R>;
    awaitOrdered2<R extends ThenArg<T>>(): InterfaceB<R>;
    awaitOrdered3<R extends ThenArg<T>>(): InterfaceB<R>;
    awaitOrdered4<R extends ThenArg<T>>(): InterfaceB<R>;
    awaitOrdered5<R extends ThenArg<T>>(): InterfaceB<R>;
    awaitOrdered6<R extends ThenArg<T>>(): InterfaceB<R>;
    awaitOrdered7<R extends ThenArg<T>>(): InterfaceB<R>;
    awaitOrdered8<R extends ThenArg<T>>(): InterfaceB<R>;
    awaitOrdered9<R extends ThenArg<T>>(): InterfaceB<R>;
}

export class A<T> implements InterfaceB<T> {
    public filter(callback: (newValue: T, oldValue: T) => boolean): B<T> {
        return undefined as any;
    }

    public map<D>(callback: (value: T) => D): B<D> {
        return undefined as any;
    }

    public await<R extends ThenArg<T>>(): B<R> {
        return undefined as any;
    }

    public awaitOrdered<R extends ThenArg<T>>(): B<R> {
        return undefined as any;
    }

    public awaitOrdered2<R extends ThenArg<T>>(): B<R> {
        return undefined as any;
    }

    public awaitOrdered3<R extends ThenArg<T>>(): B<R> {
        return undefined as any;
    }

    public awaitOrdered4<R extends ThenArg<T>>(): B<R> {
        return undefined as any;
    }

    public awaitOrdered5<R extends ThenArg<T>>(): B<R> {
        return undefined as any;
    }

    public awaitOrdered6<R extends ThenArg<T>>(): B<R> {
        return undefined as any;
    }

    public awaitOrdered7<R extends ThenArg<T>>(): B<R> {
        return undefined as any;
    }

    public awaitOrdered8<R extends ThenArg<T>>(): B<R> {
        return undefined as any;
    }

    public awaitOrdered9<R extends ThenArg<T>>(): B<R> {
        return undefined as any;
    }

    public awaitLatest<R extends ThenArg<T>>(): B<R> {
        return undefined as any;
    }
}

export class B<T> extends A<T> { }

//// [performanceComparisonOfStructurallyIdenticalInterfacesWithGenericSignatures.js]
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = exports.A = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.filter = function (callback) {
        return undefined;
    };
    A.prototype.map = function (callback) {
        return undefined;
    };
    A.prototype.await = function () {
        return undefined;
    };
    A.prototype.awaitOrdered = function () {
        return undefined;
    };
    A.prototype.awaitOrdered2 = function () {
        return undefined;
    };
    A.prototype.awaitOrdered3 = function () {
        return undefined;
    };
    A.prototype.awaitOrdered4 = function () {
        return undefined;
    };
    A.prototype.awaitOrdered5 = function () {
        return undefined;
    };
    A.prototype.awaitOrdered6 = function () {
        return undefined;
    };
    A.prototype.awaitOrdered7 = function () {
        return undefined;
    };
    A.prototype.awaitOrdered8 = function () {
        return undefined;
    };
    A.prototype.awaitOrdered9 = function () {
        return undefined;
    };
    A.prototype.awaitLatest = function () {
        return undefined;
    };
    return A;
}());
exports.A = A;
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(A));
exports.B = B;
