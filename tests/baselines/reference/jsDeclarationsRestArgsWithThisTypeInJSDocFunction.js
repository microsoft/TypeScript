//// [bug38550.js]
export class Clazz {
  /**
   * @param {function(this:Object, ...*):*} functionDeclaration
   */
  method(functionDeclaration) {}
}


//// [bug38550.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clazz = void 0;
var Clazz = /** @class */ (function () {
    function Clazz() {
    }
    /**
     * @param {function(this:Object, ...*):*} functionDeclaration
     */
    Clazz.prototype.method = function (functionDeclaration) { };
    return Clazz;
}());
exports.Clazz = Clazz;


//// [bug38550.d.ts]
export class Clazz {
    /**
     * @param {function(this:Object, ...*):*} functionDeclaration
     */
    method(functionDeclaration: (this: any, ...args: any[]) => any): void;
}
