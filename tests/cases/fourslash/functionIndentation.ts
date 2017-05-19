/// <reference path="fourslash.ts"/>

////module M {
////export =
////C;
////class C {
////constructor(b
////) {
////}
////foo(a
////: string) {
////return a
////|| true;
////}
////get bar(
////) {
////return 1;
////}
////}
////function foo(a,
////b?) {
////new M.C(
////"hello");
////}
////{
////{
////}
////}
////foo(
////function() {
////"hello";
////});
////foo(
////() => {
////"hello";
////});
////var t,
////u = 1,
////v;
////}

format.document();
verify.currentFileContentIs(
"module M {\n" +
"    export =\n" +
"        C;\n" +
"    class C {\n" +
"        constructor(b\n" +
"        ) {\n" +
"        }\n" +
"        foo(a\n" +
"            : string) {\n" +
"            return a\n" +
"                || true;\n" +
"        }\n" +
"        get bar(\n" +
"        ) {\n" +
"            return 1;\n" +
"        }\n" +
"    }\n" +
"    function foo(a,\n" +
"        b?) {\n" +
"        new M.C(\n" +
"            \"hello\");\n" +
"    }\n" +
"    {\n" +
"        {\n" +
"        }\n" +
"    }\n" +
"    foo(\n" +
"        function() {\n" +
"            \"hello\";\n" +
"        });\n" +
"    foo(\n" +
"        () => {\n" +
"            \"hello\";\n" +
"        });\n" +
"    var t,\n" +
"        u = 1,\n" +
"        v;\n" +
"}");