//// [tests/cases/compiler/commentBeforeStaticMethod1.ts] ////

//// [commentBeforeStaticMethod1.ts]
class C {
  /**
   * Returns bar
   */
  public static foo(): string {
    return "bar";
  }
}

//// [commentBeforeStaticMethod1.js]
var C = /** @class */ (function () {
    function C() {
    }
    /**
     * Returns bar
     */
    C.foo = function () {
        return "bar";
    };
    return C;
}());
