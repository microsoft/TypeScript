//// [tests/cases/conformance/override/overrideWithoutNoImplicitOverride1.ts] ////

//// [overrideWithoutNoImplicitOverride1.ts]
export declare class AmbientClass {
    override yadda(): void;
}

export class NonAmbientClass {
    override yadda(): void {}
}

/////

export declare class AmbientBase {
    foo(): void;
}

export declare class AmbientDerived extends AmbientBase {
    foo(): void;

    override bar(): void;
}

/////

declare namespace ambientNamespace {
    export class AmbientBase {
        foo(): void;
    }

    export class AmbientDerived extends AmbientBase {
        foo(): void;

        override bar(): void;
    }
}

/////

export class NonAmbientBase {
    foo(): void {}
}

export class NonAmbientDerived extends NonAmbientBase {
    foo(): void {}

    override bar(): void {}
}


//// [overrideWithoutNoImplicitOverride1.js]
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
exports.NonAmbientDerived = exports.NonAmbientBase = exports.NonAmbientClass = void 0;
var NonAmbientClass = /** @class */ (function () {
    function NonAmbientClass() {
    }
    NonAmbientClass.prototype.yadda = function () { };
    return NonAmbientClass;
}());
exports.NonAmbientClass = NonAmbientClass;
/////
var NonAmbientBase = /** @class */ (function () {
    function NonAmbientBase() {
    }
    NonAmbientBase.prototype.foo = function () { };
    return NonAmbientBase;
}());
exports.NonAmbientBase = NonAmbientBase;
var NonAmbientDerived = /** @class */ (function (_super) {
    __extends(NonAmbientDerived, _super);
    function NonAmbientDerived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NonAmbientDerived.prototype.foo = function () { };
    NonAmbientDerived.prototype.bar = function () { };
    return NonAmbientDerived;
}(NonAmbientBase));
exports.NonAmbientDerived = NonAmbientDerived;
