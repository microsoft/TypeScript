//// [clodulesDerivedClasses.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Shape = (function () {
    function Shape() {
    }
    return Shape;
})();

var Shape;
(function (Shape) {
    (function (Utils) {
        function convert() {
            return null;
        }
        Utils.convert = convert;
    })(Shape.Utils || (Shape.Utils = {}));
    var Utils = Shape.Utils;
})(Shape || (Shape = {}));

var Path = (function (_super) {
    __extends(Path, _super);
    function Path() {
        _super.apply(this, arguments);
    }
    return Path;
})(Shape);

var Path;
(function (Path) {
    (function (Utils) {
        function convert2() {
            return null;
        }
        Utils.convert2 = convert2;
    })(Path.Utils || (Path.Utils = {}));
    var Utils = Path.Utils;
})(Path || (Path = {}));
