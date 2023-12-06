/// <reference path="fourslash.ts" />
// @allowJs: true
// @checkJs: true
// @noEmit: true
// @filename: gotoDefinitionConstructorFunction.js
//// function /*end*/StringStreamm() {
//// }
//// StringStreamm.prototype = {
//// };
////
//// function runMode () {
//// new [|/*start*/StringStreamm|]()
//// };

verify.baselineGoToDefinition('start')
