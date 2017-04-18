//// [emitArrowFunctionWhenUsingArguments12_ES6.ts]
class C {
    f(arguments) {
        var a = () => arguments;
    }
}

//// [emitArrowFunctionWhenUsingArguments12_ES6.js]
class C {
    f(arguments) {
        var a = () => arguments;
    }
}
