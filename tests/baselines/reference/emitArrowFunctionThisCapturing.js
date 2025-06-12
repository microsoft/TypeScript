//// [tests/cases/conformance/es6/arrowFunction/emitArrowFunctionThisCapturing.ts] ////

//// [emitArrowFunctionThisCapturing.ts]
var f1 = () => {
    this.age = 10
};

var f2 = (x: string) => {
    this.name = x
}

function foo(func: () => boolean) { }
foo(() => {
    this.age = 100;
    return true;
});


//// [emitArrowFunctionThisCapturing.js]
var f1 = () => {
    this.age = 10;
};
var f2 = (x) => {
    this.name = x;
};
function foo(func) { }
foo(() => {
    this.age = 100;
    return true;
});
