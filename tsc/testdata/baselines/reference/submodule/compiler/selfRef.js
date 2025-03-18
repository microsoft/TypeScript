//// [tests/cases/compiler/selfRef.ts] ////

//// [selfRef.ts]
module M
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
