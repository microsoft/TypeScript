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
var M;
(function (M) {
    class Test {
        name = "hello";
        setName = function (value) {
            (function () {
                name = value;
            })();
        };
        getName = function () {
            return name;
        };
    }
    M.Test = Test;
})(M || (M = {}));
