//// [collisionRestParameterArrowFunctions.ts]
var f1 = (_i: number, ...restParameters) => { //_i is error
    var _i = 10; // no error
}
var f1NoError = (_i: number) => { // no error
    var _i = 10; // no error
}

var f2 = (...restParameters) => {
    var _i = 10; // No Error
}
var f2NoError = () => {
    var _i = 10; // no error
}

//// [collisionRestParameterArrowFunctions.js]
var f1 = function (_i) {
    var restParameters = [];
    for (var _0 = 1; _0 < arguments.length; _0++) {
        restParameters[_0 - 1] = arguments[_0];
    }
    var _i = 10; // no error
};
var f1NoError = function (_i) {
    var _i = 10; // no error
};
var f2 = function () {
    var restParameters = [];
    for (var _0 = 0; _0 < arguments.length; _0++) {
        restParameters[_0 - 0] = arguments[_0];
    }
    var _i = 10; // No Error
};
var f2NoError = function () {
    var _i = 10; // no error
};
