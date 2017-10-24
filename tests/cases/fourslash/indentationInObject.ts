/// <reference path="fourslash.ts"/>

//// function foo() {
////     {/*8_0*/x:1;y:2;z:3};
////     {x:1/*12_0*/;y:2;z:3};
////     {x:1;/*8_1*/y:2;z:3};
////     {
////         x:1;/*8_2*/y:2;z:3};
////     {x:1;y:2;z:3/*4_0*/};
////     {
////         x:1;y:2;z:3/*4_1*/};
////     {x:1;y:2;z:3}/*4_2*/;
////     {
////         x:1;y:2;z:3}/*4_3*/;
//// }

for (let i = 0; i < 4; ++i) {
    goTo.marker(`4_${i}`);
    edit.insertLine("");
    verify.indentationIs(4);
}
for (let i = 0; i < 3; ++i) {
    goTo.marker(`8_${i}`);
    edit.insertLine("");
    verify.indentationIs(8);
}

    goTo.marker(`12_0`);
    edit.insertLine("");
    verify.indentationIs(12);
