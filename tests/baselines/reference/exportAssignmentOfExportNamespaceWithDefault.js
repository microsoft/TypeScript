//// [tests/cases/conformance/externalModules/exportAssignmentOfExportNamespaceWithDefault.ts] ////

//// [main.ts]
// https://github.com/microsoft/TypeScript/issues/39149
import a from "a";
a();

//// [external.d.ts]
declare module "b" {
    export function a(): void;
    export namespace a {
        var _a: typeof a;
        export { _a as default };
    }
    export default a;
}

declare module "a" {
    import { a } from "b";
    export = a;
}

//// [main.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://github.com/microsoft/TypeScript/issues/39149
const a_1 = __importDefault(require("a"));
(0, a_1.default)();
