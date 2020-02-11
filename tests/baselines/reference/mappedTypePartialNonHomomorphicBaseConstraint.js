//// [mappedTypePartialNonHomomorphicBaseConstraint.ts]
export type Errors<D> = { readonly [K in keyof D | "base"]?: string[] };

class Model<D> {
  getErrors(): Errors<D> {
    return { base: ["some base error"] };
  }
}


//// [mappedTypePartialNonHomomorphicBaseConstraint.js]
"use strict";
exports.__esModule = true;
var Model = /** @class */ (function () {
    function Model() {
    }
    Model.prototype.getErrors = function () {
        return { base: ["some base error"] };
    };
    return Model;
}());
