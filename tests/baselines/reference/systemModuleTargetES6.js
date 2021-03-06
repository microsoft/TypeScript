//// [systemModuleTargetES6.ts]
export class MyClass { }
export class MyClass2 {
    static value = 42;
    static getInstance() { return MyClass2.value; }
}

export function myFunction() {
    return new MyClass();
}

export function myFunction2() {
    return new MyClass2();
}

//// [systemModuleTargetES6.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var MyClass, MyClass2;
    var __moduleName = context_1 && context_1.id;
    function myFunction() {
        return new MyClass();
    }
    exports_1("myFunction", myFunction);
    function myFunction2() {
        return new MyClass2();
    }
    exports_1("myFunction2", myFunction2);
    return {
        setters: [],
        execute: function () {
            MyClass = class MyClass {
            };
            exports_1("MyClass", MyClass);
            MyClass2 = class MyClass2 {
                static getInstance() { return MyClass2.value; }
            };
            exports_1("MyClass2", MyClass2);
            MyClass2.value = 42;
        }
    };
});
