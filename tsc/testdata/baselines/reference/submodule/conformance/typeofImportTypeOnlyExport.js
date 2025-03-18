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
class ClassMapDirective {
}
const directive = (class_) => () => ({
    directive: class_,
});
exports.directive = directive;
exports.classMap = (0, exports.directive)(ClassMapDirective);
//// [button.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
const lit_js_1 = require("./lit.js");
exports.c = (0, lit_js_1.classMap)();
