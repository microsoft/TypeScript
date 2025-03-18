//// [tests/cases/compiler/declarationEmitComputedNameCausesImportToBePainted.ts] ////

//// [context.ts]
export const Key = Symbol();
export interface Context {
  [Key]: string;
}
//// [index.ts]
import { Key, Context } from "./context";

export const context: Context = {
  [Key]: 'bar',
}

export const withContext = ({ [Key]: value }: Context) => value;

//// [context.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Key = void 0;
exports.Key = Symbol();
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withContext = exports.context = void 0;
const context_1 = require("./context");
exports.context = {
    [context_1.Key]: 'bar',
};
const withContext = ({ [context_1.Key]: value }) => value;
exports.withContext = withContext;
