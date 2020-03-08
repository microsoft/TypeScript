//// [parameterPropertyInConstructor3.ts]
class Foo {
  constructor(public constructor: string) {}
}


//// [parameterPropertyInConstructor3.js]
var Foo = /** @class */ (function () {
    function Foo(constructor) {
        this.constructor = constructor;
    }
    return Foo;
}());
