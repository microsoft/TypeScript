//// [classPropertyErrorOnNameOnly.ts]
type Values = 1 | 2 | 3 | 4 | 5 | 6

type FuncType = (arg: Values) => string

// turn on strictNullChecks
class Example {
  insideClass: FuncType = function(val) { // error span goes from here
    switch (val) {
      case 1:
        return "1";
      case 2:
        return "2";
      case 3:
        return "3"
      case 4:
        return "4"
      case 5:
        return "5"
      // forgot case 6
    }
  } // all the way to here
}

const outsideClass: FuncType = function(val) { // compare to errors only on this line in this case 
    switch (val) {
      case 1:
        return "1";
      case 2:
        return "2";
      case 3:
        return "3"
      case 4:
        return "4"
      case 5:
        return "5"
      // forgot case 6
    }
}

//// [classPropertyErrorOnNameOnly.js]
"use strict";
// turn on strictNullChecks
var Example = /** @class */ (function () {
    function Example() {
        this.insideClass = function (val) {
            switch (val) {
                case 1:
                    return "1";
                case 2:
                    return "2";
                case 3:
                    return "3";
                case 4:
                    return "4";
                case 5:
                    return "5";
                // forgot case 6
            }
        }; // all the way to here
    }
    return Example;
}());
var outsideClass = function (val) {
    switch (val) {
        case 1:
            return "1";
        case 2:
            return "2";
        case 3:
            return "3";
        case 4:
            return "4";
        case 5:
            return "5";
        // forgot case 6
    }
};
