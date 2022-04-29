/// <reference path="fourslash.ts"/>

////
////module classes {
////{| "indent": 0 |} 
////    class Bar {
////{| "indent": 4 |} 
////
////        constructor() {
////{| "indent": 8 |} 
////        }
////
////        private foo: string = "";
////{| "indent": 8 |} 
////
////        private f() {
////            var a: any[] = [[1, 2], [3, 4], 5];
////{| "indent": 12 |} 
////            return ((1 + 1));
////        }
////
////{| "indent": 8 |} 
////        private f2() {
////            if (true) { } { };
////        }
////    }
////}
////
////
////module interfaces {
////{| "indent": 0 |} 
////    interface Foo {
////{| "indent": 4 |} 
////
////        x: number;
////{| "indent": 8 |} 
////
////        foo(): number;
////{| "indent": 8 |} 
////    }
////}
////
////
////module nestedModules {
////    module Foo2 {
////{| "indent": 4 |} 
////        function f() {
////        }
////{| "indent": 8 |} 
////        var x: number;
////{| "indent": 8 |} 
////    }
////}
////
////
////module Enums {
////    enum Foo3 {
////{| "indent": 4 |} 
////        val1,
////{| "indent": 8 |} 
////        val2,
////{| "indent": 8 |} 
////    }
////{| "indent": 4 |} 
////}
////
////
////function controlStatements() {
////    for (var i = 0; i < 10; i++) {
////{| "indent": 4 |} 
////    }
////
////    for (var e in foo.bar) {
////{| "indent": 4 |} 
////    }
////
////    with (foo.bar) {
////{| "indent": 4 |} 
////    }
////
////    while (false) {
////{| "indent": 4 |} 
////    }
////
////    do {
////{| "indent": 4 |} 
////    } while (false);
////
////    switch (foo.bar) {
////{| "indent": 4 |} 
////    }
////
////    switch (foo.bar) {
////{| "indent": 4 |} 
////        case 1:
////{| "indent": 8 |} 
////            break;
////        default:
////{| "indent": 8 |} 
////            break;
////    }
////}
////
////
////function tryCatch() {
////{| "indent": 0 |} 
////    try {
////{| "indent": 4 |} 
////    }
////{| "indent": 4 |} 
////    catch (err) {
////{| "indent": 4 |} 
////    }
////{| "indent": 4 |} 
////}
////
////
////function tryFinally() {
////{| "indent": 0 |} 
////    try {
////{| "indent": 4 |} 
////    }
////{| "indent": 4 |} 
////    finally {
////{| "indent": 4 |} 
////    }
////{| "indent": 4 |} 
////}
////
////
////function tryCatchFinally() {
////{| "indent": 0 |} 
////    try {
////{| "indent": 4 |} 
////    }
////{| "indent": 4 |} 
////    catch (err) {
////{| "indent": 4 |} 
////    }
////{| "indent": 4 |} 
////    finally {
////{| "indent": 4 |} 
////    }
////{| "indent": 4 |} 
////}
////
////
////class indentBeforeCurly 
////{| "indent": 0 |} 
////{| "indent": 0 |}{
////{| "indent": 0 |} 
////}
////
////
////function argumentsListIndentation(bar,
////             blah,
////             {| "indent": 13 |} 
////);
////
////
////function blockIndentAfterIndentedParameter1(bar,
////             blah) {
////{| "indent": 13 |} 
////}
////
////
////function blockIndentAfterIndentedParameter2(bar,
////             blah) {
////    if (foo) {
////{| "indent": 4 |} 
////    }
////}
////
////
////// Note: Do not add more tests at the end of this file, as
//////       the purpose of this test is to verity smart indent
//////       works for unterminated function arguments at the end of a file.
////function unterminatedListIndentation(a,
////{| "indent": 0 |}

test.markers().forEach(marker => {
    verify.indentationAtPositionIs(marker.fileName, marker.position, marker.data.indent, ts.IndentStyle.Block);
});
