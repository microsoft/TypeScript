// @strict: true

// @filename: node_modules/@types/lodash/object.d.ts
import _ = require("./index");
declare module "./index" {
    interface LoDashStatic {
      pick: <T extends object, U extends keyof T>(
        object: T,
        ...props: Array<U>
      ) => Pick<T, U>;
    }
}

// @filename: node_modules/@types/lodash/pick.d.ts
import { pick } from "./index";
export = pick;

// @filename: node_modules/@types/lodash/index.d.ts
/// <reference path="./object.d.ts" />
export = _;
export as namespace _;
declare const _: _.LoDashStatic;
declare namespace _ {
    interface LoDashStatic {}
}

// @filename: index.ts
import * as pick from 'lodash/pick';
export const pick = () => pick();
