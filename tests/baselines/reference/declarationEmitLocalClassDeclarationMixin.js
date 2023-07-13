//// [tests/cases/compiler/declarationEmitLocalClassDeclarationMixin.ts] ////

//// [declarationEmitLocalClassDeclarationMixin.ts]
interface Constructor<C> { new (...args: any[]): C; }

function mixin<B extends Constructor<{}>>(Base: B) {
    class PrivateMixed extends Base {
        bar = 2;
    }
    return PrivateMixed;
}

export class Unmixed {
    foo = 1;
}

export const Mixed = mixin(Unmixed);

function Filter<C extends Constructor<{}>>(ctor: C) {
    abstract class FilterMixin extends ctor {
        abstract match(path: string): boolean;
        // other concrete methods, fields, constructor
        thing = 12;
    }
    return FilterMixin;
}

export class FilteredThing extends Filter(Unmixed) {
    match(path: string) {
        return false;
    }
}


//// [declarationEmitLocalClassDeclarationMixin.js]
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
exports.FilteredThing = exports.Mixed = exports.Unmixed = void 0;
function mixin(Base) {
    var PrivateMixed = /** @class */ (function (_super) {
        __extends(PrivateMixed, _super);
        function PrivateMixed() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.bar = 2;
            return _this;
        }
        return PrivateMixed;
    }(Base));
    return PrivateMixed;
}
var Unmixed = /** @class */ (function () {
    function Unmixed() {
        this.foo = 1;
    }
    return Unmixed;
}());
exports.Unmixed = Unmixed;
exports.Mixed = mixin(Unmixed);
function Filter(ctor) {
    var FilterMixin = /** @class */ (function (_super) {
        __extends(FilterMixin, _super);
        function FilterMixin() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // other concrete methods, fields, constructor
            _this.thing = 12;
            return _this;
        }
        return FilterMixin;
    }(ctor));
    return FilterMixin;
}
var FilteredThing = /** @class */ (function (_super) {
    __extends(FilteredThing, _super);
    function FilteredThing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilteredThing.prototype.match = function (path) {
        return false;
    };
    return FilteredThing;
}(Filter(Unmixed)));
exports.FilteredThing = FilteredThing;


//// [declarationEmitLocalClassDeclarationMixin.d.ts]
export declare class Unmixed {
    foo: number;
}
export declare const Mixed: {
    new (...args: any[]): {
        bar: number;
    };
} & typeof Unmixed;
declare const FilteredThing_base: (abstract new (...args: any[]) => {
    match(path: string): boolean;
    thing: number;
}) & typeof Unmixed;
export declare class FilteredThing extends FilteredThing_base {
    match(path: string): boolean;
}
export {};
