// @target:es5
var x;
if (true) {
    let x;
    var obj1 = { x: x }; // Should be { x: _x }, emits as { _x: _x }
    var obj2 = { x }; // Should be { x: _x }, emits as { _x: x }
}