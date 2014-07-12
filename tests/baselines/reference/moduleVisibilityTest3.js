//// [moduleVisibilityTest3.js]
var _modes;
(function (_modes) {
    var Mode = (function () {
        function Mode() {
        }
        return Mode;
    })();
})(_modes || (_modes = {}));

//_modes. // produces an internal error - please implement in derived class
var editor;
(function (editor) {
    var i;

    // If you just use p1:modes, the compiler accepts it - should be an error
    var Bug = (function () {
        function Bug(p1, p2) {
            var x;
        }
        return Bug;
    })();
})(editor || (editor = {}));
