/// <reference path='fourslash.ts' />

//// interface Z { z: boolean; }
//// interface X { x: string; }
//// interface Y { y: number; }
////
//// interface A { o: Z; }
//// interface B { o: X; }
//// interface C { o: Y; }
////
//// type ABC = A & B & C;
////
//// let alphabeta: ABC = { }


verify.codeFix({
    description: "Implement interface 'ABC'",
    newFileContent:
`interface Z { z: boolean; }
interface X { x: string; }
interface Y { y: number; }

interface A { o: Z; }
interface B { o: X; }
interface C { o: Y; }

type ABC = A & B & C;

let alphabeta: ABC = {
    o: {
        z: false,
        x: "",
        y: 0
    },
}`,
});