//// [tests/cases/compiler/declarationEmitMixinPrivateProtected.ts] ////

//// [first.ts]
declare function mix<TMix>(mixin: TMix): TMix;

const DisposableMixin = class {
    protected _onDispose() {
        this._assertIsStripped()
    }
    private _assertIsStripped() {
    }
};

// No error, but definition is wrong. 
export default mix(DisposableMixin);
export class Monitor extends mix(DisposableMixin) {
    protected _onDispose() {
    }
}

//// [another.ts]
declare function mix<TMix>(mixin: TMix): TMix;

const DisposableMixin = class {
    protected _onDispose() {
        this._assertIsStripped()
    }
    private _assertIsStripped() {
    }
};

export default class extends mix(DisposableMixin) {
    protected _onDispose() {
    }
}

//// [first.js]
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
exports.Monitor = void 0;
var DisposableMixin = /** @class */ (function () {
    function class_1() {
    }
    class_1.prototype._onDispose = function () {
        this._assertIsStripped();
    };
    class_1.prototype._assertIsStripped = function () {
    };
    return class_1;
}());
// No error, but definition is wrong. 
exports.default = mix(DisposableMixin);
var Monitor = /** @class */ (function (_super) {
    __extends(Monitor, _super);
    function Monitor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Monitor.prototype._onDispose = function () {
    };
    return Monitor;
}(mix(DisposableMixin)));
exports.Monitor = Monitor;
//// [another.js]
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
var DisposableMixin = /** @class */ (function () {
    function class_1() {
    }
    class_1.prototype._onDispose = function () {
        this._assertIsStripped();
    };
    class_1.prototype._assertIsStripped = function () {
    };
    return class_1;
}());
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    default_1.prototype._onDispose = function () {
    };
    return default_1;
}(mix(DisposableMixin)));
exports.default = default_1;
