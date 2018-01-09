/// <reference path="fourslash.ts"/>

////function foo() {
////    let x: any;
////    x = /*8_0*/class { constructor(public x: number) { } };
////    x = class /*4_0*/{ constructor(public x: number) { } };
////    x = class { /*8_1*/constructor(public x: number) { } };
////    x = class { constructor(/*12_0*/public x: number) { } };
////    x = class { constructor(public /*12_1*/x: number) { } };
////    x = class { constructor(public x: number) {/*8_2*/ } };
////    x = class {
////        constructor(/*12_2*/public x: number) { }
////    };
////    x = class {
////        constructor(public x: number) {/*8_3*/ }
////    };
////    x = class {
////        constructor(public x: number) { }/*4_1*/};
////}

function verifyIndentation(level: number, count: number) {
    for (let i = 0; i < count; ++i) {
        goTo.marker(`${level}_${i}`);
        edit.insertLine("");
        verify.indentationIs(level);
    }
}

verifyIndentation(4, 2);
verifyIndentation(8, 4);
verifyIndentation(12, 3);