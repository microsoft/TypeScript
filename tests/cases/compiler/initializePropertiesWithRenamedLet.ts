// @target: es5

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