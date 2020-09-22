// @allowJs: true
// @outDir: ./out
// @filename: export.js
exports["another one"] = class {
    c;
    d;
};
exports["a thing"] = exports;
// @filename: usage.ts
import * as A from "./export";
import Result = A."a thing";

export const another: Result."another one" = new Result["another one"]();
export const again: A."a thing"."a thing"."another one" = null as any as A."another one";
export const type: typeof Result."a thing"."another one" = {} as any;

import Result2 = A.'a thing';

export const another2: Result.'another one' = new Result['another one']();
export const again2: A.'a thing'.'a thing'.'another one' = null as any as A.'another one';
export const type2: typeof Result.'a thing'.'another one' = {} as any;

import Result3 = A.`a thing`;

export const another3: Result.`another one` = new Result[`another one`]();
export const again3: A.`a thing`.`a thing`.`another one` = null as any as A.`another one`;
export const type3: typeof Result.`a thing`.`another one` = {} as any;
