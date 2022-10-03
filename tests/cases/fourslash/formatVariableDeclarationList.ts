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
verify.currentLineContentIs("    fun2 = (function(f) {");
goTo.marker("7");
verify.currentLineContentIs("        var fun = function() {");
goTo.marker("8");
verify.currentLineContentIs("            console.log(f());");
goTo.marker("9");
verify.currentLineContentIs("        },");
goTo.marker("10");
verify.currentLineContentIs("            x = 'Foo';");
goTo.marker("11");
verify.currentLineContentIs("        return fun;");
goTo.marker("12");
verify.currentLineContentIs("    }(fun1));");