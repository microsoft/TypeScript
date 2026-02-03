//// [tests/cases/compiler/javascriptThisAssignmentInStaticBlock.ts] ////

//// [a.js]
class Thing {
    static {
        this.doSomething = () => {};
    }
}

Thing.doSomething();

// GH#46468
class ElementsArray extends Array {
    static {
        const superisArray = super.isArray;
        const customIsArray = (arg)=> superisArray(arg);
        this.isArray = customIsArray;
    }
}

ElementsArray.isArray(new ElementsArray());

//// [a.js]
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
var _a, _b;
var Thing = /** @class */ (function () {
    function Thing() {
    }
    return Thing;
}());
_a = Thing;
(function () {
    _a.doSomething = function () { };
})();
Thing.doSomething();
// GH#46468
var ElementsArray = /** @class */ (function (_super) {
    __extends(ElementsArray, _super);
    function ElementsArray() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ElementsArray;
}(Array));
_b = ElementsArray;
(function () {
    var superisArray = _super.isArray;
    var customIsArray = function (arg) { return superisArray(arg); };
    _b.isArray = customIsArray;
})();
ElementsArray.isArray(new ElementsArray());


//// [a.d.ts]
declare class Thing {
}
declare class ElementsArray extends Array<any> {
    constructor(arrayLength?: number);
    constructor(arrayLength: number);
    constructor(...items: any[]);
}
