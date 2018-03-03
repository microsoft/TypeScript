// @target: es5
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