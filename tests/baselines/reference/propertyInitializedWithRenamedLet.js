//// [propertyInitializedWithRenamedLet.ts]
var x;
if (true) {
    let x;
    var obj1 = { x: x }; // Should be { x: _x }
    var obj2 = { x }; // Should be { x: _x }
}

//// [propertyInitializedWithRenamedLet.js]
var x;
if (true) {
    var _x;
    var obj1 = {
        x: _x
    }; // Should be { x: _x }
    var obj2 = {
        x: _x
    }; // Should be { x: _x }
}
