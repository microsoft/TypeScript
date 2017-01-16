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
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var someVariable;
var Class1 = (function () {
    function Class1() {
    }
    return Class1;
}());
var Class2 = (function (_super) {
    __extends(Class2, _super);
    function Class2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Class2;
}(Class1));
var Class3 = (function () {
    function Class3() {
    }
    return Class3;
}());
var Class4 = (function (_super) {
    __extends(Class4, _super);
    function Class4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Class4;
}(Class3));
