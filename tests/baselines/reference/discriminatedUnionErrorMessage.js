//// [discriminatedUnionErrorMessage.ts]
type Square = { kind: "sq", size: number }
type Rectangle = { kind: "rt", x: number, y: number }
type Circle = { kind: "cr", radius: number }
type Shape =
    | Square
    | Rectangle
    | Circle;
let shape: Shape = {
    kind: "sq",
    x: 12,
    y: 13,
}


//// [discriminatedUnionErrorMessage.js]
var shape = {
    kind: "sq",
    x: 12,
    y: 13
};
