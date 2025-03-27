/// <reference path='fourslash.ts'/>

//// enum Color/*c*/ {
////     Red,
////     Green,
////     Blue,
//// }
//// const x/*x*/: Color = Color.Red;

//// const enum Direction/*d*/ {
////     Up,
////     Down,
//// }
//// const y/*y*/: Direction = Direction.Up;

verify.baselineQuickInfo({
    c: [0, 1],
    x: [0, 1],
    d: [0, 1],
    y: [0, 1],
});