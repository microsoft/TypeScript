//// [optionalBindingParametersInOverloads1.ts]
function foo([x, y, z] ?: [string, number, boolean]);
function foo(...rest: any[]) {

}

foo(["", 0, false]);

foo([false, 0, ""]);

//// [optionalBindingParametersInOverloads1.js]
function foo() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
}
foo(["", 0, false]);
foo([false, 0, ""]);
