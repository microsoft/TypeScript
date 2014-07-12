//// [getAccessorWithImpliedReturnTypeAndFunctionClassMerge.js]
var MyModule;
(function (MyModule) {
    var MyClass = (function () {
        function MyClass() {
        }
        Object.defineProperty(MyClass.prototype, "myGetter", {
            get: function () {
                var obj = {};

                return obj;
            },
            enumerable: true,
            configurable: true
        });
        return MyClass;
    })();
    MyModule.MyClass = MyClass;
})(MyModule || (MyModule = {}));
