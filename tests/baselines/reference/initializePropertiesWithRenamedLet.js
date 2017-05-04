//// [initializePropertiesWithRenamedLet.ts]
var x0;
if (true) {
    let x0;
    var obj1 = { x0: x0 };
    var obj2 = { x0 };
}

var x, y, z;
if (true) {
    let { x: x } = { x: 0 };
    let { y } = { y: 0 };
    let z;
    ({ z: z } = { z: 0 });
    ({ z } = { z: 0 });
}

//// [initializePropertiesWithRenamedLet.js]
var x0;
if (true) {
    var x0_1;
    var obj1 = { x0: x0_1 };
    var obj2 = { x0: x0_1 };
}
var x, y, z;
if (true) {
    var x_1 = { x: 0 }.x;
    var y_1 = { y: 0 }.y;
    var z_1;
    (z_1 = { z: 0 }.z);
    (z_1 = { z: 0 }.z);
}
