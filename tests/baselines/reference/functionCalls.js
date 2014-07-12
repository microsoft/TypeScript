//// [functionCalls.js]
// Invoke function call on value of type 'any' with no type arguments
var anyVar;
anyVar(0);
anyVar('');

// Invoke function call on value of type 'any' with type arguments
// These should be errors
anyVar('hello');
anyVar();
anyVar(undefined);

var subFunc;
subFunc(0);
subFunc('');
subFunc();

// Invoke function call on value of a subtype of Function with no call signatures with type arguments
// These should be errors
subFunc(0);
subFunc('');
subFunc();

// Invoke function call on value of type Function with no call signatures with type arguments
// These should be errors
var func;
func(0);
func('');
func();
