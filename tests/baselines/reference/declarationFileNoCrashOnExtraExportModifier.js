//// [input.ts]
export = exports;
declare class exports {
    constructor(p: number);
    t: number;
}
export class Sub {
    instance!: {
        t: number;
    };
}
declare namespace exports {
    export { Sub };
}

//// [input.js]
"use strict";
exports.Sub = void 0;
var Sub = /** @class */ (function () {
    function Sub() {
    }
    return Sub;
}());
module.exports = exports;
