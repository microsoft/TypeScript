//// [tests/cases/compiler/thisTypeComparisonExtended.ts] ////

//// [thisTypeComparisonExtended.ts]
// Test 1: Original issue - this === subclass instance should work
class AA {
    do1() {
        const b = dd.getB();
        if (this === b) {  // Should not error
            console.log("this === b");
        }
    }
}

class BB extends AA {
    getB(): BB { return this; }
}

let dd = new BB();
dd.do1();

// Test 2: this === unrelated class should still error
class CC {
    value: number = 42;
}

class DD {
    test() {
        const c = new CC();
        if (this === c) {  // Should still error - no relationship
            console.log("unrelated");
        }
    }
}

// Test 3: Multiple inheritance levels
class EE extends BB {
    getE(): EE { return this; }
}

class FF extends EE {
    testMultiLevel() {
        const e = new EE();
        if (this === e) {  // Should not error - FF extends EE
            console.log("multi-level inheritance");
        }
    }
}

// Test 4: Interface implementation
interface ITest {
    getValue(): number;
}

class GG implements ITest {
    getValue() { return 42; }
    
    testInterface() {
        const impl: ITest = new GG();
        if (this === impl) {  // Should not error
            console.log("interface implementation");
        }
    }
}

//// [thisTypeComparisonExtended.js]
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
// Test 1: Original issue - this === subclass instance should work
var AA = /** @class */ (function () {
    function AA() {
    }
    AA.prototype.do1 = function () {
        var b = dd.getB();
        if (this === b) { // Should not error
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
// Test 2: this === unrelated class should still error
var CC = /** @class */ (function () {
    function CC() {
        this.value = 42;
    }
    return CC;
}());
var DD = /** @class */ (function () {
    function DD() {
    }
    DD.prototype.test = function () {
        var c = new CC();
        if (this === c) { // Should still error - no relationship
            console.log("unrelated");
        }
    };
    return DD;
}());
// Test 3: Multiple inheritance levels
var EE = /** @class */ (function (_super) {
    __extends(EE, _super);
    function EE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EE.prototype.getE = function () { return this; };
    return EE;
}(BB));
var FF = /** @class */ (function (_super) {
    __extends(FF, _super);
    function FF() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FF.prototype.testMultiLevel = function () {
        var e = new EE();
        if (this === e) { // Should not error - FF extends EE
            console.log("multi-level inheritance");
        }
    };
    return FF;
}(EE));
var GG = /** @class */ (function () {
    function GG() {
    }
    GG.prototype.getValue = function () { return 42; };
    GG.prototype.testInterface = function () {
        var impl = new GG();
        if (this === impl) { // Should not error
            console.log("interface implementation");
        }
    };
    return GG;
}());
