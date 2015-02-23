//// [optionalBindingParameters1.ts]

function foo([x,y,z]?: [string, number, boolean]) {

}

foo(["", 0, false]);

foo([false, 0, ""]);

//// [optionalBindingParameters1.js]
function foo(_a) {
}
foo(["", 0, false]);
foo([false, 0, ""]);
