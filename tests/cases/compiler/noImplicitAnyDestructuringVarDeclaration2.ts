// @noimplicitany: true
let [a, b, c] = [1, 2, 3]; // no error
let [a1 = 10, b1 = 10, c1 = 10] = [1, 2, 3]; // no error
let [a2 = undefined, b2 = undefined, c2 = undefined] = [1, 2, 3]; // no error
let [a3 = <any>undefined, b3 = <any>null, c3 = <any>undefined] = [1, 2, 3]; // no error
let [a4] = [<any>undefined], [b4] = [<any>null], c4 = <any>undefined, d4 = <any>null; // no error

let {x, y, z} = { x: 1, y: 2, z: 3 }; // no error
let {x1 = 10, y1 = 10, z1 = 10} = { x1: 1, y1: 2, z1: 3 }; // no error
let {x2 = undefined, y2 = undefined, z2 = undefined} = { x2: 1, y2: 2, z2: 3 }; // no error
let {x3 = <any>undefined, y3 = <any>null, z3 = <any>undefined} = { x3: 1, y3: 2, z3: 3 }; // no error
let {x4} = { x4: <any>undefined }, {y4} = { y4: <any>null }; // no error
