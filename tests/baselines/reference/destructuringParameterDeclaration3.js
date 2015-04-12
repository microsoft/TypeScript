//// [destructuringParameterDeclaration3.ts]
function a([x, [y, z], [[j]]]) {
    return [x, y, z, j];
}

function a1([...x]) {
    return [x];
}

function a2({public} = { "public": "1" }) {
    return public;
}

function a3({x: { y, z}, j: {k: {a}} }) {
    return [y, z, a];
}

function a4({x: { y, z}, j: {k: {a}} } = { x: { y: 1, z: 1 }, j: { k: { a: "hello" } } }): (number| string) [] {
    return [y, z, a];
}

function a5({x: { y, z}, j: {k: {a}} }): (number| string) [] {
    return [y, z, a];
}


//// [destructuringParameterDeclaration3.js]
function a(_a) {
    var x = _a[0], _b = _a[1], y = _b[0], z = _b[1], j = _a[2][0][0];
    return [x, y, z, j];
}
function a1(_a) {
    var x = _a.slice(0);
    return [x];
}
function a2(_a) {
    var public = (_a === void 0 ? { "public": "1" } : _a).public;
    return public;
}
function a3(_a) {
    var _b = _a.x, y = _b.y, z = _b.z, a = _a.j.k.a;
    return [y, z, a];
}
function a4(_a) {
    var _b = _a === void 0 ? { x: { y: 1, z: 1 }, j: { k: { a: "hello" } } } : _a, _c = _b.x, y = _c.y, z = _c.z, a = _b.j.k.a;
    return [y, z, a];
}
function a5(_a) {
    var _b = _a.x, y = _b.y, z = _b.z, a = _a.j.k.a;
    return [y, z, a];
}
