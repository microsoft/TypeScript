/// <reference path='fourslash.ts' />

//// enum CardinalPoint { North, East, South, West }
//// type alias = CardinalPoint
//// interface foo {
////     x: alias;
//// }
////
//// let n: foo = { }

verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`enum CardinalPoint { North, East, South, West }
type alias = CardinalPoint
interface foo {
    x: alias;
}

let n: foo = {
    x: CardinalPoint.North,
}`,
});