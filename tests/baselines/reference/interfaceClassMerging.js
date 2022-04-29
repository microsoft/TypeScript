//// [interfaceClassMerging.ts]
interface Foo {
    method(a: number): string;
    optionalMethod?(a: number): string;
    property: string;
    optionalProperty?: string;
}

class Foo {
    additionalProperty: string;

    additionalMethod(a: number): string {
        return this.method(0);
    }
}

class Bar extends Foo {
    method(a: number) {
        return this.optionalProperty;
    }
}


var bar = new Bar();
bar.method(0);
bar.optionalMethod(1);
bar.property;
bar.optionalProperty;
bar.additionalProperty;
bar.additionalMethod(2);

var obj: {
    method(a: number): string;
    property: string;
    additionalProperty: string;
    additionalMethod(a: number): string;
};

bar = obj;
obj = bar;


//// [interfaceClassMerging.js]
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
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.additionalMethod = function (a) {
        return this.method(0);
    };
    return Foo;
}());
var Bar = /** @class */ (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bar.prototype.method = function (a) {
        return this.optionalProperty;
    };
    return Bar;
}(Foo));
var bar = new Bar();
bar.method(0);
bar.optionalMethod(1);
bar.property;
bar.optionalProperty;
bar.additionalProperty;
bar.additionalMethod(2);
var obj;
bar = obj;
obj = bar;
