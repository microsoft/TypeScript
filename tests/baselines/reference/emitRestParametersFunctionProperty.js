//// [emitRestParametersFunctionProperty.ts]
var obj: {
    func1: (...rest) => void
}

var obj2 = {
    func(...rest) { }
}

//// [emitRestParametersFunctionProperty.js]
var obj;
var obj2 = {
    func: function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i - 0] = arguments[_i];
        }
    }
};
