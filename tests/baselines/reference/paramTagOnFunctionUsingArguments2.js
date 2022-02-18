//// [paramTagOnFunctionUsingArguments2.ts]
class Foo {
  /**
   * @param {foo-module.Foo} foo
   */
  m(foo: unknown): void {
      arguments;
  }
}


//// [paramTagOnFunctionUsingArguments2.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    /**
     * @param {foo-module.Foo} foo
     */
    Foo.prototype.m = function (foo) {
        arguments;
    };
    return Foo;
}());
