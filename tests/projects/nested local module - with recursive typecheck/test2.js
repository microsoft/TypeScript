define(["require", "exports", "test1"], function(require, exports, __test__) {
    exports.$;
    (function (Yo) {
        var test = __test__;

        test.x;
        function y() {
            return 0;
        }
        Yo.y = y;
    })(exports.Yo || (exports.Yo = {}));
    var Yo = exports.Yo;
})
