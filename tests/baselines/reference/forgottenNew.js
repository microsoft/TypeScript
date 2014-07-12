//// [forgottenNew.js]
var Tools;
(function (Tools) {
    var NullLogger = (function () {
        function NullLogger() {
        }
        return NullLogger;
    })();
    Tools.NullLogger = NullLogger;
})(Tools || (Tools = {}));

var logger = Tools.NullLogger();
