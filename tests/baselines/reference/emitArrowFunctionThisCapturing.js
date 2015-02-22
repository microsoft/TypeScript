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
var _this = this;
var f1 = function () {
    _this.age = 10;
};
var f2 = function (x) {
    _this.name = x;
};
function foo(func) { }
foo(function () {
    _this.age = 100;
    return true;
});
