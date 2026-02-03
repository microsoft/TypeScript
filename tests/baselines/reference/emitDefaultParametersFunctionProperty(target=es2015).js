//// [tests/cases/conformance/es6/defaultParameters/emitDefaultParametersFunctionProperty.ts] ////

//// [emitDefaultParametersFunctionProperty.ts]
var obj2 = {
    func1(y = 10, ...rest) { },
    func2(x = "hello") { },
    func3(x: string, z: number, y = "hello") { },
    func4(x: string, z: number, y = "hello", ...rest) { },
}


//// [emitDefaultParametersFunctionProperty.js]
var obj2 = {
    func1(y = 10, ...rest) { },
    func2(x = "hello") { },
    func3(x, z, y = "hello") { },
    func4(x, z, y = "hello", ...rest) { },
};
