//// [genericCallWithConstructorTypedArguments5.js]
// Generic call with parameter of object type with member of function type of n args passed object whose associated member is call signature with n+1 args
function foo(arg) {
    return new arg.cb(null);
}

var arg;
var r = foo(arg);

// more args not allowed
var arg2;
var r2 = foo(arg2);
var arg3;
var r3 = foo(arg3);

function foo2(arg) {
    return new arg.cb(null, null);
}

// fewer args ok
var r4 = foo(arg);
var arg4;
var r6 = foo(arg4);
var arg5;
var r7 = foo(arg5);
