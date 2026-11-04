//// [tests/cases/compiler/importedValueInEnumComputedNameNoFlake.ts] ////

//// [key.ts]
export const key = "member";

//// [main.ts]
import { key } from "./key";

export enum Example {
    [key] = 0,
}

//// [key.js]
export const key = "member";
//// [main.js]
import { key } from "./key";
export var Example;
(function (Example) {
    Example[Example[key] = 0] = key;
})(Example || (Example = {}));
