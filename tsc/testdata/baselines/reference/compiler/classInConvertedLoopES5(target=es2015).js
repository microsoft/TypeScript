//// [tests/cases/compiler/classInConvertedLoopES5.ts] ////

//// [classInConvertedLoopES5.ts]
const classesByRow: Record<string, object> = {};
for (const row of ['1', '2', '3', '4', '5']) {
  class RowClass {
    row = row;
    static factory = () => new RowClass();
  }

  classesByRow[row] = RowClass;
}

//// [classInConvertedLoopES5.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
const classesByRow = {};
for (const row of ['1', '2', '3', '4', '5']) {
    class RowClass {
        constructor() {
            this.row = row;
        }
    }
    RowClass.factory = __setFunctionName(() => new RowClass(), "factory");
    classesByRow[row] = RowClass;
}
