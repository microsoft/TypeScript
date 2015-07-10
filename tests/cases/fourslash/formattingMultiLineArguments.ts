///<reference path="fourslash.ts"/>

////foo({
////},
/////*1*/
////3);

////foo({},
/////*2*/
////3)/*3*/

////foo([
////],
////3, {/*4v*//*4n*/
////});

////foo({
////}, {
////bar: 3/*5v*//*5n*/
////});

////foo(`
////`,
////3, {
////})/*6*/


goTo.marker('1');
verify.indentationIs(0);
goTo.marker('2');
verify.indentationIs(4);
goTo.marker('3');
edit.insert(';');
verify.currentLineContentIs('    3);');

goTo.marker('4n');
edit.insertLine("");
goTo.marker('4v');
verify.currentLineContentIs('3, {');

goTo.marker('5n');
edit.insertLine("");
goTo.marker('5v');
verify.currentLineContentIs("    bar: 3");

goTo.marker('6');
edit.insert(';');
verify.currentLineContentIs('});');