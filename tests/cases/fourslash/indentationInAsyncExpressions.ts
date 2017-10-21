/// <reference path="fourslash.ts"/>


//// async function* foo() {
////     yield /*8_0*/await 1;
////     yield await /*8_1*/1;
////     yield 
////     await /*8_2*/1;
////     yield await 1/*8_3*/;
//// }

for (let i = 0; i < 4; ++i) {
    goTo.marker(`8_${i}`);
    edit.insertLine("");
    verify.indentationIs(8);
}