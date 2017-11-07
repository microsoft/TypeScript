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
    func: function () { }
};
