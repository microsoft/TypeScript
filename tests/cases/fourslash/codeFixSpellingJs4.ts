/// <reference path='fourslash.ts' />

// @allowjs: true
// @noEmit: true

// @filename: a.js
//// var object = {
////     spaaace: 3
//// }
//// object.spaaaace // error on read
//// object.spaace = 12 // error on write
//// object.fresh = 12 // OK
verify.codeFixAll({
    fixId: "fixSpelling",
    fixAllDescription: "Fix all detected spelling errors",
    newFileContent:
`var object = {
    spaaace: 3
}
object.spaaace // error on read
object.spaaace = 12 // error on write
object.fresh = 12 // OK`,
});
