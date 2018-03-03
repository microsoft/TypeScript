//// [emitRestParametersArgumentsCollision.ts]
function foo1(...rest) {
    var arguments;
}
function foo2(...rest) {
    var arguments = 0;
}
function foo3(...rest) {
    var arguments;
    return rest;
}
function foo4(...rest) {
    var arguments = 0;
    return rest;
}
function foo5(...rest) {
    var arguments;
    arguments = 0;
    return rest;
}
function foo6(...rest) {
    var notUsed, arguments;
    return rest;
}
function foo7(...rest) {
    var notUsed, arguments;
    arguments = 0;
    return rest;
}
function foo8(...rest) {
    var notUsed, arguments = 0;
    return rest;
}

//// [emitRestParametersArgumentsCollision.js]
function foo1() {
    var arguments;
}
function foo2() {
    var arguments = 0;
}
function foo3() {
    var arguments;
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    return rest;
}
function foo4() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    var arguments = 0;
    return rest;
}
function foo5() {
    var arguments;
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    arguments = 0;
    return rest;
}
function foo6() {
    var notUsed, arguments;
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    return rest;
}
function foo7() {
    var notUsed, arguments;
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    arguments = 0;
    return rest;
}
function foo8() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    var notUsed, arguments = 0;
    return rest;
}
