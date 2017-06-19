//// [overloadResolutionOverNonCTLambdas.ts]
module Bugs {
  class A {
  }
  
  // replace(searchValue: RegExp, replaceValue: (substring: string, ...args: any[]) => string): string;
  function bug2(message:string, ...args:any[]):string {
    var result= message.replace(/\{(\d+)\}/g, function(match, ...rest) {
      var index= rest[0];
      return typeof args[index] !== 'undefined'
        ? args[index]
        : match;
    });
    return result;
  }
}

function bug3(f:(x:string)=>string) { return f("s") }

function fprime(x:string):string { return x; }

bug3(fprime);

bug3(function(x:string):string { return x; });

//// [overloadResolutionOverNonCTLambdas.js]
var Bugs;
(function (Bugs) {
    var A = /** @class */ (function () {
        function A() {
        }
        return A;
    }());
    // replace(searchValue: RegExp, replaceValue: (substring: string, ...args: any[]) => string): string;
    function bug2(message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var result = message.replace(/\{(\d+)\}/g, function (match) {
            var rest = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                rest[_i - 1] = arguments[_i];
            }
            var index = rest[0];
            return typeof args[index] !== 'undefined'
                ? args[index]
                : match;
        });
        return result;
    }
})(Bugs || (Bugs = {}));
function bug3(f) { return f("s"); }
function fprime(x) { return x; }
bug3(fprime);
bug3(function (x) { return x; });
