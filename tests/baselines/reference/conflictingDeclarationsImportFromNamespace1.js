//// [tests/cases/compiler/conflictingDeclarationsImportFromNamespace1.ts] ////

//// [object.d.ts]
import _ = require("./index");
declare module "./index" {
    interface LoDashStatic {
      pick<T extends object, U extends keyof T>(
        object: T,
        ...props: Array<U>
      ): Pick<T, U>;
    }
}

//// [pick.d.ts]
import { pick } from "./index";
export = pick;

//// [index.d.ts]
/// <reference path="./object.d.ts" />
export = _;
export as namespace _;
declare const _: _.LoDashStatic;
declare namespace _ {
    interface LoDashStatic {}
}

//// [index.ts]
import * as pick from 'lodash/pick';
export const pick = () => pick();


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = void 0;
var pick = require("lodash/pick");
var pick = function () { return (0, exports.pick)(); };
exports.pick = pick;
