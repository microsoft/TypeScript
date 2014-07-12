//// [genericWithCallSignatures_1.ts]
///<reference path="genericWithCallSignatures_0.ts"/>
class MyClass {
    public callableThing: CallableExtention<string>;

    public myMethod() {
        var x = <string> this.callableThing();
    }
}

//// [genericWithCallSignatures_0.js]
//// [genericWithCallSignatures_1.js]
///<reference path="genericWithCallSignatures_0.ts"/>
var MyClass = (function () {
    function MyClass() {
    }
    MyClass.prototype.myMethod = function () {
        var x = this.callableThing();
    };
    return MyClass;
})();
