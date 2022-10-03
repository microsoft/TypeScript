// @noImplicitAny: true

try {
    throw [0, 1];
}
catch ([a, b]) {
    a + b;
}

try {
    throw { a: 0, b: 1 };
}
catch ({a, b}) {
    a + b;
}

try {
    throw [{ x: [0], z: 1 }];
}
catch ([{x: [y], z}]) {
    y + z;
}

// Test of comment ranges. A fix to GH#11755 should update this.
try {
}
catch (/*Test comment ranges*/[/*a*/a]) {

}
