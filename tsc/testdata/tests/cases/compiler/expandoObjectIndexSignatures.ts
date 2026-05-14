// @checkJs: true
// @noEmit: true

// https://github.com/microsoft/typescript-go/issues/3739

// @filename: main.js

/** @param {Record<string, number>} obj */
function fx(obj) {}

const obj1 = {};
fx(obj1);

const obj2 = {};
obj2.x = 1
fx(obj2);

function f1() {
    const obj1 = {};
    fx(obj1);
}

function f2() {
    const obj2 = {};
    obj2.x = 1
    fx(obj2);
}

const obj3 = {};
obj3.x = 1;
obj3.y = Object.values(obj3);  // Circularity error

function f3() {
    const obj3 = {};
    obj3.x = 1;
    obj3.y = Object.values(obj3);  // Circularity error
}
