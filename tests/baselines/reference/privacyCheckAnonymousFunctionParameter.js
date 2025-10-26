//// [tests/cases/compiler/privacyCheckAnonymousFunctionParameter.ts] ////

//// [privacyCheckAnonymousFunctionParameter.ts]
export var x = 1;  // Makes this an external module
interface Iterator<T> {
}

namespace Query {
    export function fromDoWhile<T>(doWhile: (test: Iterator<T>) => boolean): Iterator<T> {
        return null;
    }

    function fromOrderBy() {
        return fromDoWhile(test => {
            return true;
        });
    }
}


//// [privacyCheckAnonymousFunctionParameter.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 1; // Makes this an external module
var Query;
(function (Query) {
    function fromDoWhile(doWhile) {
        return null;
    }
    Query.fromDoWhile = fromDoWhile;
    function fromOrderBy() {
        return fromDoWhile(function (test) {
            return true;
        });
    }
})(Query || (Query = {}));


//// [privacyCheckAnonymousFunctionParameter.d.ts]
export declare var x: number;
