/// <reference path='fourslash.ts' />

//// enum CardinalPoint { North, East, South, West }
//// interface foo {
////     x: CardinalPoint;
//// }
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`enum CardinalPoint { North, East, South, West }
interface foo {
    x: CardinalPoint;
}
let n: foo = {
    x: CardinalPoint.North,
}`,
});