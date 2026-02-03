//// [tests/cases/compiler/unusedIdentifiersConsolidated1.ts] ////

//// [unusedIdentifiersConsolidated1.ts]
function greeter(person: string) {
    var unused = 20;
}

class Dummy<usedtypeparameter, unusedtypeparameter> {
    private unusedprivatevariable: string;
    private greeting: string;
    public unusedpublicvariable: string;
    public typedvariable: usedtypeparameter;

    constructor(message: string) {
        var unused2 = 22;
        this.greeting = "Dummy Message";
    }

    public greeter(person: string) {
        var unused = 20;
        this.usedPrivateFunction();
    }

    private usedPrivateFunction() {
    }

    private unUsedPrivateFunction() {
    }
}

var user = "Jane User";
var user2 = "Jane2 User2";

namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }

    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s2: string) {
            return lettersRegexp.test(s2);
        }

        private unUsedPrivateFunction() {
        }
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s3: string) {
            return s3.length === 5;
        }
    }

    interface usedLocallyInterface {
    }

    interface usedLocallyInterface2 {
        someFunction(s1: string): void;
    }

    export interface exportedInterface {
    }

    class dummy implements usedLocallyInterface {
    }

    interface unusedInterface {
    }
}


namespace Greeter {
    class class1 {
    }

    export class class2 extends class1 {
    }

    class class3 {
    }

    export class class4 {
    }

    interface interface1 {
    }

    export interface interface2 extends interface1 {
    }

    interface interface3 {
    }

    export interface interface4 {
    }

    export let a: interface3;

    interface interface5 {
    }
}

//// [unusedIdentifiersConsolidated1.js]
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
function greeter(person) {
    var unused = 20;
}
var Dummy = /** @class */ (function () {
    function Dummy(message) {
        var unused2 = 22;
        this.greeting = "Dummy Message";
    }
    Dummy.prototype.greeter = function (person) {
        var unused = 20;
        this.usedPrivateFunction();
    };
    Dummy.prototype.usedPrivateFunction = function () {
    };
    Dummy.prototype.unUsedPrivateFunction = function () {
    };
    return Dummy;
}());
var user = "Jane User";
var user2 = "Jane2 User2";
var Validation;
(function (Validation) {
    var lettersRegexp = /^[A-Za-z]+$/;
    var numberRegexp = /^[0-9]+$/;
    var LettersOnlyValidator = /** @class */ (function () {
        function LettersOnlyValidator() {
        }
        LettersOnlyValidator.prototype.isAcceptable = function (s2) {
            return lettersRegexp.test(s2);
        };
        LettersOnlyValidator.prototype.unUsedPrivateFunction = function () {
        };
        return LettersOnlyValidator;
    }());
    Validation.LettersOnlyValidator = LettersOnlyValidator;
    var ZipCodeValidator = /** @class */ (function () {
        function ZipCodeValidator() {
        }
        ZipCodeValidator.prototype.isAcceptable = function (s3) {
            return s3.length === 5;
        };
        return ZipCodeValidator;
    }());
    Validation.ZipCodeValidator = ZipCodeValidator;
    var dummy = /** @class */ (function () {
        function dummy() {
        }
        return dummy;
    }());
})(Validation || (Validation = {}));
var Greeter;
(function (Greeter) {
    var class1 = /** @class */ (function () {
        function class1() {
        }
        return class1;
    }());
    var class2 = /** @class */ (function (_super) {
        __extends(class2, _super);
        function class2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return class2;
    }(class1));
    Greeter.class2 = class2;
    var class3 = /** @class */ (function () {
        function class3() {
        }
        return class3;
    }());
    var class4 = /** @class */ (function () {
        function class4() {
        }
        return class4;
    }());
    Greeter.class4 = class4;
})(Greeter || (Greeter = {}));
