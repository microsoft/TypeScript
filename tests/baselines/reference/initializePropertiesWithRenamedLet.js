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
    var _x0;
    var obj1 = {
        x0: _x0
    };
    var obj2 = {
        x0: _x0
    };
}
var x, y, z;
if (true) {
    var _x = ({
        x: 0
    }).x;
    var _y = ({
        y: 0
    }).y;
    var _z;
    (_a = {
        z: 0
    }, _z = _a.z, _a);
    (_b = {
        z: 0
    }, _z = _b.z, _b);
}
var _a, _b;
