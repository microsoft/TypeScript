/// <reference path="fourslash.ts"/>

////
////module classes {
////{| "indent": 4 |} 
////    class Bar {
////{| "indent": 8 |} 
////
////        constructor() {
////{| "indent": 12 |} 
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
////{| "indent": 4 |} 
////    interface Foo {
////{| "indent": 8 |} 
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
////{| "indent": 8 |} 
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
////{| "indent": 8 |} 
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
////{| "indent": 8 |} 
////    }
////
////    for (var e in foo.bar) {
////{| "indent": 8 |} 
////    }
////
////    with (foo.bar) {
////{| "indent": 8 |} 
////    }
////
////    while (false) {
////{| "indent": 8 |} 
////    }
////
////    do {
////{| "indent": 8 |} 
////    } while (false);
////
////    switch (foo.bar) {
////{| "indent": 8 |} 
////    }
////
////    switch (foo.bar) {
////{| "indent": 8 |} 
////        case 1:
////{| "indent": 12 |} 
////            break;
////        default:
////{| "indent": 12 |} 
////            break;
////    }
////}
////
////
////function tryCatch() {
////{| "indent": 4 |} 
////    try {
////{| "indent": 8 |} 
////    }
////{| "indent": 4 |} 
////    catch (err) {
////{| "indent": 8 |} 
////    }
////{| "indent": 4 |} 
////}
////
////
////function tryFinally() {
////{| "indent": 4 |} 
////    try {
////{| "indent": 8 |} 
////    }
////{| "indent": 4 |} 
////    finally {
////{| "indent": 8 |} 
////    }
////{| "indent": 4 |} 
////}
////
////
////function tryCatchFinally() {
////{| "indent": 4 |} 
////    try {
////{| "indent": 8 |} 
////    }
////{| "indent": 4 |} 
////    catch (err) {
////{| "indent": 8 |} 
////    }
////{| "indent": 4 |} 
////    finally {
////{| "indent": 8 |} 
////    }
////{| "indent": 4 |} 
////}
////
////
////class indentBeforeCurly 
////{| "indent": 0 |} 
////{| "indent": 0 |}{
////{| "indent": 4 |} 
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
////{| "indent": 4 |} 
////}
////
////
////function blockIndentAfterIndentedParameter2(bar,
////             blah) {
////    if (foo) {
////{| "indent": 8 |} 
////    }
////}
////
////
////// Note: Do not add more tests at the end of this file, as
//////       the purpose of this test is to verity smart indent
//////       works for unterminated function arguments at the end of a file.
////function unterminatedListIndentation(a,
////{| "indent": 4 |}

test.markers().forEach(marker => {
    verify.indentationAtPositionIs(marker.fileName, marker.position, marker.data.indent);
});
