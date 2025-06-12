//// [tests/cases/compiler/binopAssignmentShouldHaveType.ts] ////

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
    class Bug {
        getName() {
            return "name";
        }
        bug() {
            var name = null;
            if ((name = this.getName()).length > 0) {
                console.log(name);
            }
        }
    }
    Test.Bug = Bug;
})(Test || (Test = {}));
