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
//// interface foo { x: ABC }
////
//// let alphabeta: foo = { }


verify.codeFix({
    description: "Implement interface 'foo'",
    newFileContent:
`interface Z { z: boolean; }
interface X { x: string; }
interface Y { y: number; }

interface A { o: Z; }
interface B { o: X; }
interface C { o: Y; }

type ABC = A & B & C;
interface foo { x: ABC }

let alphabeta: foo = {
    x: {
        o: {
            z: false,
            x: "",
            y: 0
        }
    },
}`,
});
