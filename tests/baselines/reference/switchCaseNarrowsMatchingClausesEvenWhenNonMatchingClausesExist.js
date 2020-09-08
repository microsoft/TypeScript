//// [switchCaseNarrowsMatchingClausesEvenWhenNonMatchingClausesExist.ts]
export const narrowToLiterals = (str: string) => {
    switch (str) {
      case 'abc': {
        // inferred type as `abc`
        return str;
      }
      default:
        return 'defaultValue';
    }
  };
  
  export const narrowToString = (str: string, someOtherStr: string) => {
    switch (str) {
      case 'abc': {
        // inferred type should be `abc`
        return str;
      }
      case someOtherStr: {
        // `string`
        return str;
      }
      default:
        return 'defaultValue';
    }
  };
  
  export const narrowToStringOrNumber = (str: string | number, someNumber: number) => {
    switch (str) {
      case 'abc': {
        // inferred type should be `abc`
        return str;
      }
      case someNumber: {
        // inferred type should be `number`
        return str;
      }
      default:
        return 'defaultValue';
    }
  };

//// [switchCaseNarrowsMatchingClausesEvenWhenNonMatchingClausesExist.js]
"use strict";
exports.__esModule = true;
exports.narrowToStringOrNumber = exports.narrowToString = exports.narrowToLiterals = void 0;
var narrowToLiterals = function (str) {
    switch (str) {
        case 'abc': {
            // inferred type as `abc`
            return str;
        }
        default:
            return 'defaultValue';
    }
};
exports.narrowToLiterals = narrowToLiterals;
var narrowToString = function (str, someOtherStr) {
    switch (str) {
        case 'abc': {
            // inferred type should be `abc`
            return str;
        }
        case someOtherStr: {
            // `string`
            return str;
        }
        default:
            return 'defaultValue';
    }
};
exports.narrowToString = narrowToString;
var narrowToStringOrNumber = function (str, someNumber) {
    switch (str) {
        case 'abc': {
            // inferred type should be `abc`
            return str;
        }
        case someNumber: {
            // inferred type should be `number`
            return str;
        }
        default:
            return 'defaultValue';
    }
};
exports.narrowToStringOrNumber = narrowToStringOrNumber;
