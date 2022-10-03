//// [genericCallWithFunctionTypedArguments5.ts]
// Generic call with parameter of object type with member of function type of n args passed object whose associated member is call signature with n+1 args

function foo<T, U>(arg: { cb: (t: T) => U }) {
    return arg.cb(null);
}

var arg = { cb: <T>(x: T) => '' };
var r = foo(arg); // {}
// more args not allowed
var r2 = foo({ cb: <T>(x: T, y: T) => '' }); // error
var r3 = foo({ cb: (x: string, y: number) => '' }); // error

function foo2<T, U>(arg: { cb: (t: T, t2: T) => U }) {
    return arg.cb(null, null);
}

// fewer args ok
var r4 = foo(arg); // {}
var r5 = foo({ cb: <T>(x: T) => '' }); // {}
var r6 = foo({ cb: (x: string) => '' }); // string
var r7 = foo({ cb: () => '' }); // string


//// [genericCallWithFunctionTypedArguments5.js]
// Generic call with parameter of object type with member of function type of n args passed object whose associated member is call signature with n+1 args
function foo(arg) {
    return arg.cb(null);
}
var arg = { cb: function (x) { return ''; } };
var r = foo(arg); // {}
// more args not allowed
var r2 = foo({ cb: function (x, y) { return ''; } }); // error
var r3 = foo({ cb: function (x, y) { return ''; } }); // error
function foo2(arg) {
    return arg.cb(null, null);
}
// fewer args ok
var r4 = foo(arg); // {}
var r5 = foo({ cb: function (x) { return ''; } }); // {}
var r6 = foo({ cb: function (x) { return ''; } }); // string
var r7 = foo({ cb: function () { return ''; } }); // string
