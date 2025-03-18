//// [tests/cases/compiler/collisionRestParameterArrowFunctions.ts] ////

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
var f1 = (_i, ...restParameters) => {
    var _i = 10;
};
var f1NoError = (_i) => {
    var _i = 10;
};
var f2 = (...restParameters) => {
    var _i = 10;
};
var f2NoError = () => {
    var _i = 10;
};
