//// [importUsedInExtendsList1_1.ts]
///<reference path='importUsedInExtendsList1_require.ts'/>
import foo = require('importUsedInExtendsList1_require');
class Sub extends foo.Super { }
var s: Sub;
var r: string = s.foo;


//// [importUsedInExtendsList1_require.js]
var Super = (function () {
    function Super() {
    }
    return Super;
})();
exports.Super = Super;
//// [importUsedInExtendsList1_1.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path='importUsedInExtendsList1_require.ts'/>
var foo = require('importUsedInExtendsList1_require');
var Sub = (function (_super) {
    __extends(Sub, _super);
    function Sub() {
        _super.apply(this, arguments);
    }
    return Sub;
})(foo.Super);
var s;
var r = s.foo;
