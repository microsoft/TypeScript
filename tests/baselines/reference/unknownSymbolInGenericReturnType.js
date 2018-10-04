//// [unknownSymbolInGenericReturnType.ts]
class Linq {
    public static select<T, S>(values: T[], func: (v: T) => A): any[] {
        var result = new Array(values.length);
 
        for (var i = 0; i < values.length; i++) {
            result[i] = func(values[i]);
        }
 
        return result;
    }
}


//// [unknownSymbolInGenericReturnType.js]
var Linq = /** @class */ (function () {
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
}());
