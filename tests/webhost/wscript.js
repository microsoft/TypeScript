var RealActiveXObject = ActiveXObject

var WScript;
(function (WScript) {
    WScript.Arguments = [];
    WScript.Echo = function (str) { };
    WScript.StdErr = {
        Write: function() {}
    }
    WScript.StdOut = {
        Write: function () { },
        WriteLine: function () { }
    }

    WScript.Quit = function (exitCode) { }
})(WScript || (WScript = {}));

var ActiveXObject = (function () {
    function ActiveXObject(name) {
    }
    return ActiveXObject;
})();
