///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: jsDocDontBreakWithNamespaces.js
/////**
//// * @returns {module:@nodefuel/web~Webserver~wsServer#hello} Websocket server object
//// */
////function foo() { }
////foo(''/*foo*/);
////
/////**
//// * @type {module:xxxxx} */
//// */
////function bar() { }
////bar(''/*bar*/);
////
/////** @type {function(module:xxxx, module:xxxx): module:xxxxx} */
////function zee() { }
////zee(''/*zee*/);

// #31298
verify.baselineSignatureHelp()
