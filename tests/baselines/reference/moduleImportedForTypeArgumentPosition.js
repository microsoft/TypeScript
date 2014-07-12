//// [moduleImportedForTypeArgumentPosition_1.ts]
/**This is on import declaration*/
import M2 = require("moduleImportedForTypeArgumentPosition_0");
class C1<T>{ }
class Test1 extends C1<M2.M2C> {
}


//// [moduleImportedForTypeArgumentPosition_0.js]
//// [moduleImportedForTypeArgumentPosition_1.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var C1 = (function () {
        function C1() {
        }
        return C1;
    })();
    var Test1 = (function (_super) {
        __extends(Test1, _super);
        function Test1() {
            _super.apply(this, arguments);
        }
        return Test1;
    })(C1);
});
