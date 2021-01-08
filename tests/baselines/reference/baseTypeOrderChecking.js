//// [baseTypeOrderChecking.ts]
var someVariable: Class4<Class2>;

 

class Class1

{

}

 

class Class2 extends Class1

{

}

 

class Class3<T>

{

               public memberVariable: Class2;

}

 

class Class4<T> extends Class3<T>

{

}


//// [baseTypeOrderChecking.js]
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
var someVariable;
var Class1 = /** @class */ (function () {
    function Class1() {
    }
    return Class1;
}());
var Class2 = /** @class */ (function (_super) {
    __extends(Class2, _super);
    function Class2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Class2;
}(Class1));
var Class3 = /** @class */ (function () {
    function Class3() {
    }
    return Class3;
}());
var Class4 = /** @class */ (function (_super) {
    __extends(Class4, _super);
    function Class4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Class4;
}(Class3));
