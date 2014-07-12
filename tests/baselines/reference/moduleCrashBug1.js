//// [moduleCrashBug1.js]
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
})(editor || (editor = {}));

var m;
