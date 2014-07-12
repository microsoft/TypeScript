/// <reference path='fourslash.ts' />

/////*1*/var   fun1   =   function   (     )     {
/////*2*/            var               x   =   'foo'             ,
/////*3*/                z   =   'bar'           ;
/////*4*/                return  x            ;
/////*5*/},
////
/////*6*/fun2   =   (                function        (   f               )   {
/////*7*/            var   fun   =   function   (        )       {
/////*8*/                        console         .  log             (           f     (  )  )       ;
/////*9*/            },
/////*10*/            x   =   'Foo'           ;
/////*11*/                return   fun            ;
/////*12*/}   (           fun1            )   )       ;
format.document();
goTo.marker("1");
verify.currentLineContentIs("var fun1 = function() {");
goTo.marker("2");
verify.currentLineContentIs("    var x = 'foo',");
goTo.marker("3");
verify.currentLineContentIs("        z = 'bar';");
goTo.marker("4");
verify.currentLineContentIs("    return x;");
goTo.marker("5");
verify.currentLineContentIs("},");
goTo.marker("6");
//bug 702537 expect result : "fun2 = (function (f) {" , actual result : "    fun2 = (function(f) {"
//verify.currentLineContentIs("fun2 = (function (f) {");
verify.currentLineContentIs("    fun2 = (function(f) {");
goTo.marker("7");
//bug 702537 expect result : "    var fun = function () {" , actual result : "        var fun = function() {"
//verify.currentLineContentIs("    var fun = function () {");
verify.currentLineContentIs("        var fun = function() {");
goTo.marker("8");
//bug 702537 expect result : "        console.log(f());" , actual result : "            console.log(f());"
//verify.currentLineContentIs("        console.log(f());");
verify.currentLineContentIs("            console.log(f());");
goTo.marker("9");
//bug 702537 expect result : "    }," , actual result : "        },"
//verify.currentLineContentIs("    },");
verify.currentLineContentIs("        },");
goTo.marker("10");
//bug 702537 expect result : "    x = 'Foo';" , actual result : "            x = 'Foo';"
//verify.currentLineContentIs("    x = 'Foo';");
verify.currentLineContentIs("            x = 'Foo';");
goTo.marker("11");
//bug 702537 expect result : "    return fun;" , actual result : "        return fun;"
//verify.currentLineContentIs("    return fun;");
verify.currentLineContentIs("        return fun;");
goTo.marker("12");
//bug 702537 expect result : "} (fun1));" , actual result : "    } (fun1));"
//verify.currentLineContentIs("} (fun1));");
verify.currentLineContentIs("    } (fun1));");
