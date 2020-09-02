/// <reference path='fourslash.ts'/>

////const a = {
////    x: 1,
////    y = 1,
////    z: 1
////}
////const b = {
////    x = 1,
////    y: 1
////}
////const c = {
////    x: 1,
////    y = 1
////}

verify.codeFixAll({
    fixAllDescription: "Switch each misused '=' to ':'",
    fixId: "fixPropertyAssignment",
    newFileContent:
`const a = {
    x: 1,
    y: 1,
    z: 1
}
const b = {
    x: 1,
    y: 1
}
const c = {
    x: 1,
    y: 1
}`
});
