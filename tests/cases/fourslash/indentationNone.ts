/// <reference path="fourslash.ts"/>

////
////module classes {
////{| "indent": 0 |} 
////    class Bar {
////{| "indent": 0 |} 
////
////        constructor() {
////{| "indent": 0 |} 
////        }
////
////        private foo: string = "";
////{| "indent": 0 |} 
////
////        private f() {
////            var a: any[] = [[1, 2], [3, 4], 5];
////{| "indent": 0 |} 
////            return ((1 + 1));
////        }
////
////{| "indent": 0 |} 
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
////{| "indent": 0 |} 
////
////        x: number;
////{| "indent": 0 |} 
////
////        foo(): number;
////{| "indent": 0 |} 
////    }
////}
////
////
////module nestedModules {
////    module Foo2 {
////{| "indent": 0 |} 
////        function f() {
////        }
////{| "indent": 0 |} 
////        var x: number;
////{| "indent": 0 |} 
////    }
////}
////
////
////module Enums {
////    enum Foo3 {
////{| "indent": 0 |} 
////        val1,
////{| "indent": 0 |} 
////        val2,
////{| "indent": 0 |} 
////    }
////{| "indent": 0 |} 
////}
////
////
////function controlStatements() {
////    for (var i = 0; i < 10; i++) {
////{| "indent": 0 |} 
////    }
////
////    for (var e in foo.bar) {
////{| "indent": 0 |} 
////    }
////
////    with (foo.bar) {
////{| "indent": 0 |} 
////    }
////
////    while (false) {
////{| "indent": 0 |} 
////    }
////
////    do {
////{| "indent": 0 |} 
////    } while (false);
////
////    switch (foo.bar) {
////{| "indent": 0 |} 
////    }
////
////    switch (foo.bar) {
////{| "indent": 0 |} 
////        case 1:
////{| "indent": 0 |} 
////            break;
////        default:
////{| "indent": 0 |} 
////            break;
////    }
////}
////
////
////function tryCatch() {
////{| "indent": 0 |} 
////    try {
////{| "indent": 0 |} 
////    }
////{| "indent": 0 |} 
////    catch (err) {
////{| "indent": 0 |} 
////    }
////{| "indent": 0 |} 
////}
////
////
////function tryFinally() {
////{| "indent": 0 |} 
////    try {
////{| "indent": 0 |} 
////    }
////{| "indent": 0 |} 
////    finally {
////{| "indent": 0 |} 
////    }
////{| "indent": 0 |} 
////}
////
////
////function tryCatchFinally() {
////{| "indent": 0 |} 
////    try {
////{| "indent": 0 |} 
////    }
////{| "indent": 0 |} 
////    catch (err) {
////{| "indent": 0 |} 
////    }
////{| "indent": 0 |} 
////    finally {
////{| "indent": 0 |} 
////    }
////{| "indent": 0 |} 
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
////             {| "indent": 0 |} 
////);
////
////
////function blockIndentAfterIndentedParameter1(bar,
////             blah) {
////{| "indent": 0 |} 
////}
////
////
////function blockIndentAfterIndentedParameter2(bar,
////             blah) {
////    if (foo) {
////{| "indent": 0 |} 
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
    verify.indentationAtPositionIs(marker.fileName, marker.position, marker.data.indent, ts.IndentStyle.None);
});
