//// [trailingCommasInFunctionParametersAndArguments.ts]
function f1(x,) {}

f1(1,);

function f2(...args,) {}

f2(...[],);


//// [trailingCommasInFunctionParametersAndArguments.js]
function f1(x) { }
f1(1);
function f2() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
}
f2.apply(void 0, []);
