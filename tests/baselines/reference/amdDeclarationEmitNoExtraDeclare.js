//// [tests/cases/compiler/amdDeclarationEmitNoExtraDeclare.ts] ////

//// [Class.ts]
import { Configurable } from "./Configurable"

export class HiddenClass {}

export class ActualClass extends Configurable(HiddenClass) {}
//// [Configurable.ts]
export type Constructor<T> = {
    new(...args: any[]): T;
}
export function Configurable<T extends Constructor<{}>>(base: T): T {
    return class extends base {

        constructor(...args: any[]) {
            super(...args);
        }

    };
}


//// [dist.js]
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
define("Configurable", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Configurable = Configurable;
    function Configurable(base) {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _super.apply(this, args) || this;
            }
            return class_1;
        }(base));
    }
});
define("Class", ["require", "exports", "Configurable"], function (require, exports, Configurable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ActualClass = exports.HiddenClass = void 0;
    var HiddenClass = /** @class */ (function () {
        function HiddenClass() {
        }
        return HiddenClass;
    }());
    exports.HiddenClass = HiddenClass;
    var ActualClass = /** @class */ (function (_super) {
        __extends(ActualClass, _super);
        function ActualClass() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ActualClass;
    }((0, Configurable_1.Configurable)(HiddenClass)));
    exports.ActualClass = ActualClass;
});


//// [dist.d.ts]
declare module "Configurable" {
    export type Constructor<T> = {
        new (...args: any[]): T;
    };
    export function Configurable<T extends Constructor<{}>>(base: T): T;
}
declare module "Class" {
    export class HiddenClass {
    }
    const ActualClass_base: typeof HiddenClass;
    export class ActualClass extends ActualClass_base {
    }
}
