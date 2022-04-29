//// [nestedBlockScopedBindings15.ts]
for (; false;) {
    {
        let x;
        () => x;
    }
}

for (; false;) {
    {
        let y;
        y = 1;
    }
}

for (; false;) {
    switch (1){
        case 1:
            let z0;
            () => z0;
            break;
    }
}

for (; false;) {
    switch (1){
        case 1:
            let z;
            z = 1;
            break;
    }
}

//// [nestedBlockScopedBindings15.js]
var _loop_1 = function () {
    {
        var x_1;
        (function () { return x_1; });
    }
};
for (; false;) {
    _loop_1();
}
for (; false;) {
    {
        var y = void 0;
        y = 1;
    }
}
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
for (; false;) {
    switch (1) {
        case 1:
            var z = void 0;
            z = 1;
            break;
    }
}
