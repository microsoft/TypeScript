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
////
/////** @type {function(module:xxxx, module:xxxx): module:xxxxx} */
////function zee() { }
////zee(''/*zee*/);


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


verify.signatureHelp({
  marker: "zee",
  text: "zee(): any",
  docComment: "",
  tags: [
    { name: "type", text: "{function(module:xxxx, module:xxxx): module:xxxxx}" },
  ],
});
