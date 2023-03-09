//// [tests/cases/conformance/declarationEmit/typeofImportTypeOnlyExport.ts] ////

//// [button.ts]
import {classMap} from './lit.js';
export const c = classMap();

//// [lit.ts]
class ClassMapDirective {}

export type {ClassMapDirective};

export const directive =
  <C>(class_: C) =>
  () => ({
    directive: class_,
  });

export const classMap = directive(ClassMapDirective);


//// [lit.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classMap = exports.directive = void 0;
var ClassMapDirective = /** @class */ (function () {
    function ClassMapDirective() {
    }
    return ClassMapDirective;
}());
var directive = function (class_) {
    return function () { return ({
        directive: class_,
    }); };
};
exports.directive = directive;
exports.classMap = (0, exports.directive)(ClassMapDirective);
//// [button.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
var lit_js_1 = require("./lit.js");
exports.c = (0, lit_js_1.classMap)();


//// [lit.d.ts]
declare class ClassMapDirective {
}
export type { ClassMapDirective };
export declare const directive: <C>(class_: C) => () => {
    directive: C;
};
export declare const classMap: () => {
    directive: typeof ClassMapDirective;
};
//// [button.d.ts]
export declare const c: {
    directive: typeof import("./lit.js").ClassMapDirective;
};
