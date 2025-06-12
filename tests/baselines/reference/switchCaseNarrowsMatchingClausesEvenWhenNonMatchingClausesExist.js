//// [tests/cases/compiler/switchCaseNarrowsMatchingClausesEvenWhenNonMatchingClausesExist.ts] ////

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.narrowToStringOrNumber = exports.narrowToString = exports.narrowToLiterals = void 0;
const narrowToLiterals = (str) => {
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
const narrowToString = (str, someOtherStr) => {
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
const narrowToStringOrNumber = (str, someNumber) => {
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
