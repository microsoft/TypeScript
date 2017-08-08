//// [binopAssignmentShouldHaveType.ts]
declare var console;
"use strict";
module Test {
 export class Bug {
  getName():string {
   return "name";
  }
  bug() {
   var name:string= null;
   if ((name= this.getName()).length > 0) {
    console.log(name);
   }
  }
 }
}

 



//// [binopAssignmentShouldHaveType.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
"use strict";
var Test;
(function (Test) {
    var Bug = (function () {
        function Bug() {
        }
        Bug.prototype.getName = function () {
            return "name";
        };
        Bug.prototype.bug = function () {
            var name = null;
            if ((name = this.getName()).length > 0) {
                console.log(name);
            }
        };
        __names(Bug.prototype, ["getName", "bug"]);
        return Bug;
    }());
    Test.Bug = Bug;
})(Test || (Test = {}));
