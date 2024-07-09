/// <reference path="fourslash.ts"/>
// @allowJs: true
// @checkJs: true
// @noEmit: true
// @filename:destruct.js
//// function [|formatter|](message) {
////   const { type } = false ? { type: message } : message;
//// }
verify.codeFix({
    description: "Infer parameter types from usage",
    index: 0,
    newFileContent: `/**
 * @param {{ type: any; }} message
 */
function formatter(message) {
  const { type } = false ? { type: message } : message;
}`
});
