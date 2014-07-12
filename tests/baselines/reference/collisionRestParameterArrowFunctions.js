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
    for (var _i = 1; _i < arguments.length; _i++) {
        restParameters[_i - 1] = arguments[_i];
    }
    var _i = 10;
};
var f1NoError = function (_i) {
    var _i = 10;
};
var f2 = function () {
    var restParameters = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        restParameters[_i - 0] = arguments[_i];
    }
    var _i = 10;
};
var f2NoError = function () {
    var _i = 10;
};
