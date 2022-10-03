//// [argumentsBindsToFunctionScopeArgumentList.ts]
var arguments = 10;
function foo(a) {
    arguments = 10;  /// This shouldnt be of type number and result in error.
}

//// [argumentsBindsToFunctionScopeArgumentList.js]
var arguments = 10;
function foo(a) {
    arguments = 10; /// This shouldnt be of type number and result in error.
}
