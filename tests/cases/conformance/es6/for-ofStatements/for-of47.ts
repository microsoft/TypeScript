//@target: ES6
var x: string, y: number;
var array = [{ x: "", y: true }]
enum E { x }
for ({x, y: y = E.x} of array) {
    x;
    y;
}