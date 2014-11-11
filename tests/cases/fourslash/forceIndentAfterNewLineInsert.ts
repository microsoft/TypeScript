///<reference path="fourslash.ts"/>

////function f()
////{ return 0; }
////function g()
////{ function h() {
////return 0;
////}}
debugger;
format.document();
verify.currentFileContentIs(
    "function f()\n" +
    "{ return 0; }\n" +
    "function g() {\n" +
    "    function h() {\n" +
    "        return 0;\n" + 
    "    }\n" + 
    "}"
    );

