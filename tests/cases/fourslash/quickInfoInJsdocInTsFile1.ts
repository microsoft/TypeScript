/// <reference path='fourslash.ts' />

//// /** @type {() => { /*1*/data: string[] }} */
//// function test(): { data: string[] } {
////   return {
////     data: [],
////   };
//// }
////
//// /** @returns {{ /*2*/data: string[] }} */
//// function test2(): { data: string[] } {
////   return {
////     data: [],
////   };
//// }
////
//// /** @type {{ /*3*/bar: string; }} */
//// const test3 = { bar: '' };
////
//// type SomeObj = { bar: string; };
//// /** @type {SomeObj/*4*/} */
//// const test4 = { bar: '' }
////
//// /**
////  * @param/*5*/ stuff/*6*/ Stuff to do stuff with
////  */
//// function doStuffWithStuff(stuff: { quantity: number }) {}
////
//// declare const stuff: { quantity: number };
//// /** @see {doStuffWithStuff/*7*/} */
//// if (stuff.quantity) {}
////
//// /** @type {(a/*8*/: string) => void} */
//// function test2(a: string) {}

verify.quickInfoAt("1", "");
verify.quickInfoAt("2", "");
verify.quickInfoAt("3", "");
verify.quickInfoAt("4", `type SomeObj = {
    bar: string;
}`);
verify.quickInfoAt(
    "5",
    `(parameter) stuff: {
    quantity: number;
}`,
    "Stuff to do stuff with"
);
verify.quickInfoAt(
    "6",
    `(parameter) stuff: {
    quantity: number;
}`,
    "Stuff to do stuff with"
);
verify.quickInfoAt(
    "7",
    `function doStuffWithStuff(stuff: {
    quantity: number;
}): void`,
);
verify.quickInfoAt("8", "");
