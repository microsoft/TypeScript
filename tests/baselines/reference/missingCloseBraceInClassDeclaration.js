//// [missingCloseBraceInClassDeclaration.ts]
class TestCls {
  prop = 0;
  method() {
    return this.prop;
  }



//// [missingCloseBraceInClassDeclaration.js]
var TestCls = /** @class */ (function () {
    function TestCls() {
        this.prop = 0;
    }
    TestCls.prototype.method = function () {
        return this.prop;
    };
    return TestCls;
}());
