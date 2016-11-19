//// [controlFlowForOfStatement.ts]
let obj: number[];
let x: string | number | boolean | RegExp;

function a() {
    x = true;
    for (x of obj) {
        x = x.toExponential();
    }
    x; // string | boolean
}


//// [controlFlowForOfStatement.js]
var obj;
var x;
function a() {
    x = true;
    for (var _i = 0, obj_1 = obj; _i < obj_1.length; _i++) {
        x = obj_1[_i];
        x = x.toExponential();
    }
    x; // string | boolean
}
