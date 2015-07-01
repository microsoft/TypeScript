/// <reference path='fourslash.ts' />

////Promise
////    .resolve()
////    .then(() => {/*1*/""/*2*/
////}).then(() => {/*3*//*4*/
////})/*semi1*//*semi2*/

////function foo() {
////    return Promise.resolve()
////        .then(function () {
////        ""/*a*/
////    })/*b*/
////}

////Promise
////    .then(
////    /*n1*/
////        )
////    /*n2*/
////    .then();


goTo.marker('1');
edit.insertLine('');
goTo.marker('2');
verify.currentLineContentIs('        ""');
edit.insertLine('');
verify.indentationIs(8);
goTo.marker('4');
edit.insertLine('');
goTo.marker('3');
verify.currentLineContentIs('    }).then(() => {');

goTo.marker("semi1");
edit.insert(';');
verify.currentLineContentIs('    });');
goTo.marker("semi2");
edit.insert(';');
verify.currentLineContentIs('    });;');

goTo.marker('a');
edit.insert(';');
verify.currentLineContentIs('            "";');
goTo.marker('b');
edit.insert(';');
verify.currentLineContentIs('        });');

goTo.marker('n1');
verify.indentationIs(8);
goTo.marker('n2');
verify.indentationIs(4);