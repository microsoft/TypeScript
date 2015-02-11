//// [emitDefaultParametersFunctionProperty.ts]
var obj2 = {
    func1(y = 10, ...rest) { },
    func2(x = "hello") { },
    func3(x: string, z: number, y = "hello") { },
    func4(x: string, z: number, y = "hello", ...rest) { },
}


//// [emitDefaultParametersFunctionProperty.js]
var obj2 = {
    func1: function (y) { },
    func2: function (x) { },
    func3: function (x, z, y) { },
    func4: function (x, z, y) { },
};
