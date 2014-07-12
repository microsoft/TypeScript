//// [importAsBaseClass_0.js]
var Greeter = (function () {
    function Greeter() {
    }
    Greeter.prototype.greet = function () {
        return 'greet';
    };
    return Greeter;
})();
exports.Greeter = Greeter;
//// [importAsBaseClass_1.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Hello = (function (_super) {
    __extends(Hello, _super);
    function Hello() {
        _super.apply(this, arguments);
    }
    return Hello;
})(Greeter);
