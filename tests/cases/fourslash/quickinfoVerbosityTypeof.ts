/// <reference path='fourslash.ts'/>

//// interface Apple {
////     color: string;
////     weight: number;
//// }

//// const a: Apple = { color: "red", weight: 150 };
//// const b/*b*/: typeof a = { color: "green", weight: 120 };

//// class Banana {
////     length: number;
////     constructor(length: number) {
////         this.length = length;
////     }
//// }

//// const c/*c*/: typeof Banana = Banana;

verify.baselineQuickInfo({
    b: [0, 1],
    c: [0, 1],
});