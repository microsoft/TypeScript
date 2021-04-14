//// [index.js]
export class Super {
    /**
     * @param {string} firstArg
     * @param {string} secondArg
     */
    constructor(firstArg, secondArg) { }
}

export class Sub extends Super {
    constructor() {
        super('first', 'second');
    }
}

//// [index.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Sub = exports.Super = void 0;
var Super = /** @class */ (function () {
    /**
     * @param {string} firstArg
     * @param {string} secondArg
     */
    function Super(firstArg, secondArg) {
    }
    return Super;
}());
exports.Super = Super;
var Sub = /** @class */ (function (_super) {
    __extends(Sub, _super);
    function Sub() {
        return _super.call(this, 'first', 'second') || this;
    }
    return Sub;
}(Super));
exports.Sub = Sub;


//// [index.d.ts]
export class Super {
    /**
     * @param {string} firstArg
     * @param {string} secondArg
     */
    constructor(firstArg: string, secondArg: string);
}
export class Sub extends Super {
    constructor();
}
