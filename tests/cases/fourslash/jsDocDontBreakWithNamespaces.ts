///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: 31298.js
/////**
//// * @returns {module:@nodefuel/web~Webserver~wsServer#hello} Websocket server object
//// */
////function foo() { }
////foo(''/**/);

verify.signatureHelp({
  marker: "",
  text: "foo(): any",
  docComment: "",
  tags: [
      { name: "returns", text: "Websocket server object" },
  ],
});
