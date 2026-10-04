//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsClassLeadingOptional.ts] ////

//// [bar.js]
export class Z {
    f(x = 1, y) {
        return [x, y];
    }
}

//// [bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Z = void 0;
class Z {
    f(x = 1, y) {
        return [x, y];
    }
}
exports.Z = Z;


//// [bar.d.ts]
export declare class Z {
    f(x: number, y: any): any[];
}
