//// [tests/cases/compiler/nestedSuperCallEmit.ts] ////

//// [nestedSuperCallEmit.ts]
// https://github.com/microsoft/TypeScript/issues/55646
abstract class Foo {
    constructor(shouldThrow: boolean) {
        if (shouldThrow) {
            throw new Error('Please retry');
        } else {
            console.log('OK');
        }
    }
}

class Bar extends Foo {
    constructor() {
        try {
            super(true);
        } catch (e: unknown) {
            console.log('Error: ' + (e as Error).message);
            // retry
            super(false);
        }
    }
}

new Bar();


//// [nestedSuperCallEmit.js]
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
// https://github.com/microsoft/TypeScript/issues/55646
var Foo = /** @class */ (function () {
    function Foo(shouldThrow) {
        if (shouldThrow) {
            throw new Error('Please retry');
        }
        else {
            console.log('OK');
        }
    }
    return Foo;
}());
var Bar = /** @class */ (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        var _this = this;
        try {
            _this = _super.call(this, true) || this;
        }
        catch (e) {
            console.log('Error: ' + e.message);
            // retry
            _this = _super.call(this, false) || this;
        }
        return _this;
    }
    return Bar;
}(Foo));
new Bar();
