//// [unknownSymbolInGenericReturnType.js]
var Linq = (function () {
    function Linq() {
    }
    Linq.select = function (values, func) {
        var result = new Array(values.length);

        for (var i = 0; i < values.length; i++) {
            result[i] = func(values[i]);
        }

        return result;
    };
    return Linq;
})();
