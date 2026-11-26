//// [tests/cases/compiler/selfRef.ts] ////

//// [selfRef.ts]
namespace M
{
    export class Test
    {
      private name = "hello";
      public setName = function(value: string): void {
	  (function () {
	      name=value;
	  })();
      }
      public getName = function(): string {
          return name;
      }
    }
}




//// [selfRef.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var M;
(function (M) {
    class Test {
        constructor() {
            this.name = "hello";
            this.setName = __setFunctionName(function (value) {
                (function () {
                    name = value;
                })();
            }, "setName");
            this.getName = __setFunctionName(function () {
                return name;
            }, "getName");
        }
    }
    M.Test = Test;
})(M || (M = {}));
