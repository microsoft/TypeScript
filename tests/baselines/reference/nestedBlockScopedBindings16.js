//// [tests/cases/compiler/nestedBlockScopedBindings16.ts] ////

//// [nestedBlockScopedBindings16.ts]
var x;
for (; false;) {
    {
        let x;
        () => x;
    }
}

var y;
for (; false;) {
    {
        let y;
        y = 1;
    }
}

var z0;
for (; false;) {
    switch (1){
        case 1:
            let z0;
            () => z0;
            break;
    }
}

var z;
for (; false;) {
    switch (1){
        case 1:
            let z;
            z = 1;
            break;
    }
}

//// [nestedBlockScopedBindings16.js]
var x;
var _loop_1 = function () {
    {
        var x_1;
        (function () { return x_1; });
    }
};
for (; false;) {
    _loop_1();
}
var y;
for (; false;) {
    {
        var y_1 = void 0;
        y_1 = 1;
    }
}
var z0;
var _loop_2 = function () {
    switch (1) {
        case 1:
            var z0_1;
            (function () { return z0_1; });
            break;
    }
};
for (; false;) {
    _loop_2();
}
var z;
for (; false;) {
    switch (1) {
        case 1:
            var z_1 = void 0;
            z_1 = 1;
            break;
    }
}
