/// <reference path="fourslash.ts" />

//// console.log({
//// }, {
//// /*1*/    a: 1,
//// /*2*/    b: 2
//// })

format.selection("1", "2");
verify.currentFileContentIs(
`console.log({
}, {
    a: 1,
    b: 2
})`);
