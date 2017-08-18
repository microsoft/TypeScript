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
    var Test = /** @class */ (function () {
        function Test() {
            this.name = "hello";
            this.setName = function (value) {
                (function () {
                    name = value;
                })();
            };
            this.getName = function () {
                return name;
            };
        }
        return Test;
    }());
    M.Test = Test;
})(M || (M = {}));
