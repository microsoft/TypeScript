//// [tests/cases/compiler/anonClassDeclarationEmitIsAnon.ts] ////

//// [wrapClass.ts]
export function wrapClass(param: any) {
    return class Wrapped {
        foo() {
            return param;
        }
    }
}

//// [index.ts]
import { wrapClass } from "./wrapClass";

export default wrapClass(0);

//// [wrapClass.js]
"use strict";
exports.__esModule = true;
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
//// [index.js]
"use strict";
exports.__esModule = true;
var wrapClass_1 = require("./wrapClass");
exports["default"] = wrapClass_1.wrapClass(0);


//// [wrapClass.d.ts]
export declare function wrapClass(param: any): {
    new (): {
        foo(): any;
    };
};
//// [index.d.ts]
declare const _default: {
    new (): {
        foo(): any;
    };
};
export default _default;
