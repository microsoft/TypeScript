//// [collisionArgumentsArrowFunctions.ts]
var f1 = (i: number, ...arguments) => { //arguments is error
    var arguments: any[]; // no error
}
var f12 = (arguments: number, ...rest) => { //arguments is error
    var arguments = 10; // no error
}
var f1NoError = (arguments: number) => { // no error
    var arguments = 10; // no error
}

var f2 = (...restParameters) => {
    var arguments = 10; // No Error
}
var f2NoError = () => {
    var arguments = 10; // no error
}

//// [collisionArgumentsArrowFunctions.js]
var f1 = function (i) {
    var arguments = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        arguments[_i - 1] = arguments[_i];
    }
    var arguments; // no error
};
var f12 = function (arguments) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    var arguments = 10; // no error
};
var f1NoError = function (arguments) {
    var arguments = 10; // no error
};
var f2 = function () {
    var restParameters = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        restParameters[_i] = arguments[_i];
    }
    var arguments = 10; // No Error
};
var f2NoError = function () {
    var arguments = 10; // no error
};
