/// <reference path="fourslash.ts"/>

////
////{| "indent": 10 , "baseIndentSize": 10 |}
////          module classes {
////{| "indent": 14 , "baseIndentSize": 10 |}
////              class Bar {
////{| "indent": 18 , "baseIndentSize": 10 |}
////
////                  constructor() {
////{| "indent": 22, "baseIndentSize": 10 |}
////                  }
////
////                  private foo: string = "";
////{| "indent": 18, "baseIndentSize": 10 |}
////
////                  private f() {
////                      var a: any[] = [[1, 2], [3, 4], 5];
////{| "indent": 22, "baseIndentSize": 10 |}
////                      return ((1 + 1));
////                  }
////
////{| "indent": 18, "baseIndentSize": 10 |}
////                  private f2() {
////                      if (true) { } { };
////                  }
////              }
////          }
////
////
////          module interfaces {
////{| "indent": 14 , "baseIndentSize": 10 |}
////              interface Foo {
////{| "indent": 18 , "baseIndentSize": 10 |}
////
////                  x: number;
////{| "indent": 18 , "baseIndentSize": 10 |}
////
////                  foo(): number;
////{| "indent": 18 , "baseIndentSize": 10 |}
////              }
////          }
////
////
////          module nestedModules {
////              module Foo2 {
////{| "indent": 18 , "baseIndentSize": 10 |}
////                  function f() {
////                  }
////{| "indent": 18 , "baseIndentSize": 10 |}
////                  var x: number;
////{| "indent": 18 , "baseIndentSize": 10 |}
////              }
////          }
////
////
////          module Enums {
////              enum Foo3 {
////{| "indent": 18 , "baseIndentSize": 10 |}
////                  val1,
////{| "indent": 18 , "baseIndentSize": 10 |}
////                  val2,
////{| "indent": 18 , "baseIndentSize": 10 |}
////              }
////{| "indent": 14 , "baseIndentSize": 10 |}
////          }
////
////
////          function controlStatements() {
////              for (var i = 0; i < 10; i++) {
////{| "indent": 18 , "baseIndentSize": 10 |}
////              }
////
////              for (var e in foo.bar) {
////{| "indent": 18 , "baseIndentSize": 10 |}
////              }
////
////              with (foo.bar) {
////{| "indent": 18 , "baseIndentSize": 10 |}
////              }
////
////              while (false) {
////{| "indent": 18 , "baseIndentSize": 10 |}
////              }
////
////              do {
////{| "indent": 18 , "baseIndentSize": 10 |}
////              } while (false);
////
////              switch (foo.bar) {
////{| "indent": 18 , "baseIndentSize": 10 |}
////              }
////
////              switch (foo.bar) {
////{| "indent": 18 , "baseIndentSize": 10 |}
////                  case 1:
////{| "indent": 22 , "baseIndentSize": 10 |}
////                      break;
////                  default:
////{| "indent": 22 , "baseIndentSize": 10 |}
////                      break;
////              }
////          }
////
////
////          function tryCatch() {
////{| "indent": 14 , "baseIndentSize": 10  |}
////              try {
////{| "indent": 18 , "baseIndentSize": 10  |}
////              }
////{| "indent": 14 , "baseIndentSize": 10  |}
////              catch (err) {
////{| "indent": 18, "baseIndentSize": 10  |}
////              }
////{| "indent": 14, "baseIndentSize": 10  |}
////           }
////
////
////          function tryFinally() {
////{| "indent": 14 , "baseIndentSize": 10  |}
////              try {
////{| "indent": 18 , "baseIndentSize": 10  |}
////              }
////{| "indent": 14 , "baseIndentSize": 10  |}
////              finally {
////{| "indent": 18 , "baseIndentSize": 10  |}
////              }
////{| "indent": 14 , "baseIndentSize": 10 |}
////          }
////
////
////          function tryCatchFinally() {
////{| "indent": 14 , "baseIndentSize": 10 |}
////              try {
////{| "indent": 18 , "baseIndentSize": 10 |}
////              }
////{| "indent": 14 , "baseIndentSize": 10 |}
////              catch (err) {
////{| "indent": 18 , "baseIndentSize": 10 |}
////              }
////{| "indent": 14 , "baseIndentSize": 10 |}
////              finally {
////{| "indent": 18 , "baseIndentSize": 10 |}
////              }
////{| "indent": 14 , "baseIndentSize": 10 |}
////          }
////
////
////          class indentBeforeCurly
////{| "indent": 10 , "baseIndentSize": 10 |}
////{| "indent": 10 , "baseIndentSize": 10 |}
////          {
////{| "indent": 14 , "baseIndentSize": 10 |}
////          }
////{| "indent": 10 , "baseIndentSize": 10 |}
////
////
////          function argumentsListIndentation(bar,
////              blah,
////             {| "indent": 14 , "baseIndentSize": 10 |}
////          );
////
////
////          function blockIndentAfterIndentedParameter1(bar,
////              blah) {
////{| "indent": 14 , "baseIndentSize": 10 |}
////          }
////
////
////          function blockIndentAfterIndentedParameter2(bar,
////              blah) {
////              if (foo) {
////{| "indent": 18 , "baseIndentSize": 10 |}
////          }
////}
////{| "indent": 10 , "baseIndentSize": 10 |}
////
////          var templateLiterals = `abcdefghi
////{| "indent": 0 , "baseIndentSize": 10 |}
////jklmnop
////{| "indent": 0 , "baseIndentSize": 10 |}
////qrstuvwxyz`;
////{| "indent": 10 , "baseIndentSize": 10 |}
////
////
////                 module changeBaseIndentSizeInSameFile {
////{| "indent": 21 , "baseIndentSize": 17 |}
////                     interface Foo {
////{| "indent": 25 , "baseIndentSize": 17 |}
////
////                         x: number;
////{| "indent": 25 , "baseIndentSize": 10 |}
////
////                         foo(): number;
////{| "indent": 25 , "baseIndentSize": 10 |}
////                     }
////{| "indent": 21 , "baseIndentSize": 10 |}
////                 }
////{| "indent": 17 , "baseIndentSize": 17 |}
////
////
////// Note: Do not add more tests at the end of this file, as
//////       the purpose of this test is to verify smart indent
//////       works for unterminated function arguments at the end of a file.
////          function unterminatedListIndentation(a,
////{| "indent": 14 , "baseIndentSize": 10 |}

test.markers().forEach(marker => {
    verify.indentationAtPositionIs(marker.fileName, marker.position, marker.data.indent, ts.IndentStyle.Smart, marker.data.baseIndentSize);
});
