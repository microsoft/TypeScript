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
"use strict";
var Test;
(function (Test) {
    var Bug = (function () {
        function Bug() {
        }
        var proto_1 = Bug.prototype;
        proto_1.getName = function () {
            return "name";
        };
        proto_1.bug = function () {
            var name = null;
            if ((name = this.getName()).length > 0) {
                console.log(name);
            }
        };
        return Bug;
    }());
    Test.Bug = Bug;
})(Test || (Test = {}));
