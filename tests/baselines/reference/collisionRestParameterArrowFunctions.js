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
    for (var _i_1 = 1; _i_1 < arguments.length; _i_1++) {
        restParameters[_i_1 - 1] = arguments[_i_1];
    }
    var _i = 10; // no error
};
var f1NoError = function (_i) {
    var _i = 10; // no error
};
var f2 = function () {
    var restParameters = [];
    for (var _i_1 = 0; _i_1 < arguments.length; _i_1++) {
        restParameters[_i_1 - 0] = arguments[_i_1];
    }
    var _i = 10; // No Error
};
var f2NoError = function () {
    var _i = 10; // no error
};
