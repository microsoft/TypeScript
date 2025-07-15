//// [tests/cases/compiler/thisTypeComparison.ts] ////

//// [thisTypeComparison.ts]
class AA {
    do1() {
        const b = dd.getB();
        if (this === b) {
            console.log("this === b");
        }
    }
}

class BB extends AA {
    getB(): BB { return this; }
}

let dd = new BB();
dd.do1();

//// [thisTypeComparison.js]
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
var AA = /** @class */ (function () {
    function AA() {
    }
    AA.prototype.do1 = function () {
        var b = dd.getB();
        if (this === b) {
            console.log("this === b");
        }
    };
    return AA;
}());
var BB = /** @class */ (function (_super) {
    __extends(BB, _super);
    function BB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BB.prototype.getB = function () { return this; };
    return BB;
}(AA));
var dd = new BB();
dd.do1();
