//// [tests/cases/compiler/mappedTypePartialConstraints.ts] ////

//// [mappedTypePartialConstraints.ts]
// Repro from #16985

interface MyInterface {
  something: number;
}

class MyClass<T extends MyInterface> {
  doIt(data : Partial<T>) {}
}

class MySubClass extends MyClass<MyInterface> {}

function fn(arg: typeof MyClass) {};

fn(MySubClass);


//// [mappedTypePartialConstraints.js]
// Repro from #16985
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
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    MyClass.prototype.doIt = function (data) { };
    return MyClass;
}());
var MySubClass = /** @class */ (function (_super) {
    __extends(MySubClass, _super);
    function MySubClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MySubClass;
}(MyClass));
function fn(arg) { }
;
fn(MySubClass);
