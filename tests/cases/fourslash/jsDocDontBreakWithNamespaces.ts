///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: 31298.js
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


verify.signatureHelp({
  marker: "foo",
  text: "foo(): any",
  docComment: "",
  tags: [
    { name: "returns", text: "Websocket server object" },
  ],
});

verify.signatureHelp({
  marker: "bar",
  text: "bar(): void",
  docComment: "",
  tags: [],
});
