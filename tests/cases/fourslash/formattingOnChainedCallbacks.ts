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

goTo.marker('1');
edit.insertLine('');
goTo.marker('2');
verify.currentLineContentIs('        ""');
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