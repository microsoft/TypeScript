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
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var someVariable;
var Class1 = (function () {
    function Class1() {
    }
    return Class1;
})();
var Class2 = (function (_super) {
    __extends(Class2, _super);
    function Class2() {
        _super.apply(this, arguments);
    }
    return Class2;
})(Class1);
var Class3 = (function () {
    function Class3() {
    }
    return Class3;
})();
var Class4 = (function (_super) {
    __extends(Class4, _super);
    function Class4() {
        _super.apply(this, arguments);
    }
    return Class4;
})(Class3);
