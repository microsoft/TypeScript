//// [tests/cases/compiler/anonClassDeclarationEmitIsAnon.ts] ////

//// [wrapClass.ts]
export function wrapClass(param: any) {
    return class Wrapped {
        foo() {
            return param;
        }
    }
}

export type Constructor<T = {}> = new (...args: any[]) => T;

export function Timestamped<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        timestamp = Date.now();
    };
}

//// [index.ts]
import { wrapClass, Timestamped } from "./wrapClass";

export default wrapClass(0);

// Simple class
export class User {
    name = '';
}

// User that is Timestamped
export class TimestampedUser extends Timestamped(User) {
    constructor() {
        super();
    }
}

//// [wrapClass.js]
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
exports.__esModule = true;
exports.Timestamped = exports.wrapClass = void 0;
function wrapClass(param) {
    return /** @class */ (function () {
        function Wrapped() {
        }
        Wrapped.prototype.foo = function () {
            return param;
        };
        return Wrapped;
    }());
}
exports.wrapClass = wrapClass;
function Timestamped(Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.timestamp = Date.now();
            return _this;
        }
        return class_1;
    }(Base));
}
exports.Timestamped = Timestamped;
//// [index.js]
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
exports.__esModule = true;
exports.TimestampedUser = exports.User = void 0;
var wrapClass_1 = require("./wrapClass");
exports["default"] = (0, wrapClass_1.wrapClass)(0);
// Simple class
var User = /** @class */ (function () {
    function User() {
        this.name = '';
    }
    return User;
}());
exports.User = User;
// User that is Timestamped
var TimestampedUser = /** @class */ (function (_super) {
    __extends(TimestampedUser, _super);
    function TimestampedUser() {
        return _super.call(this) || this;
    }
    return TimestampedUser;
}((0, wrapClass_1.Timestamped)(User)));
exports.TimestampedUser = TimestampedUser;


//// [wrapClass.d.ts]
export declare function wrapClass(param: any): {
    new (): {
        foo(): any;
    };
};
export declare type Constructor<T = {}> = new (...args: any[]) => T;
export declare function Timestamped<TBase extends Constructor>(Base: TBase): {
    new (...args: any[]): {
        timestamp: number;
    };
} & TBase;
//// [index.d.ts]
declare const _default: {
    new (): {
        foo(): any;
    };
};
export default _default;
export declare class User {
    name: string;
}
declare const TimestampedUser_base: {
    new (...args: any[]): {
        timestamp: number;
    };
} & typeof User;
export declare class TimestampedUser extends TimestampedUser_base {
    constructor();
}
