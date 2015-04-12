// @target: es6
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
