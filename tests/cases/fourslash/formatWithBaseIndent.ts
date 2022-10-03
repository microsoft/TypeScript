/// <reference path='fourslash.ts'/>

////
/////*1*/   module        classes                {
/////*2*/              class              Bar                    {
////
/////*3*/      constructor()                                                  {
/////*4*/                                       }
////
/////*5*/private foo: string = "";
////
/////*6*/                                                         private f() {
/////*7*/     var a: any[] =                [[1, 2], [3, 4], 5];
/////*8*/         return ((1 + 1));
/////*9*/                                                   }
////
/////*10*/       private f2() {
/////*11*/                      if (true) { } { };
/////*12*/                  }
/////*13*/              }
/////*14*/          }
////
////
/////*15*/                                                                       module interfaces {
/////*16*/    interface                Foo                  {
////
/////*17*/      x: number;
////
/////*18*/      foo():               number;
/////*19*/                                    }
/////*20*/                        }
////
////
/////*21*/                              module nestedModules {
/////*22*/   module Foo2 {
/////*23*/                                      function f() {
/////*24*/       }
/////*25*/                                            var x: number;
/////*26*/}
/////*27*/  }
////
////
/////*28*/                                                                                                    module Enums {
/////*29*/    enum Foo3       {
/////*30*/                                val1       ,
/////*31*/   val2,
/////*32*/                          }
/////*33*/                                                          }
////
////
/////*34*/   function controlStatements() {
/////*35*/                                for (var i = 0; i < 10; i++) {
/////*36*/                              }
////
/////*37*/ for (var e in foo.bar) {
/////*38*/              }
////
/////*39*/with (foo.bar)             {
/////*40*/                                  }
////
/////*41*/                                                      while (false) {
/////*42*/     }
////
/////*43*/     do {
/////*44*/              } while (false);
////
/////*45*/                                 switch (foo.bar) {
/////*46*/                                }
////
/////*47*/  switch (foo.bar) {
/////*48*/                                       case 1:
/////*49*/          break;
/////*50*/                            default:
/////*51*/             break;
/////*52*/                               }
/////*53*/                     }
////
////
/////*54*/                        function            tryCatch() {
/////*55*/try {
/////*56*/}
/////*57*/catch (err) {
/////*58*/                         }
/////*59*/   }
////
////
/////*60*/    function tryFinally() {
/////*61*/                                        try {
/////*62*/                                              }
/////*63*/                                 finally {
/////*64*/                               }
/////*65*/               }
////
////
/////*66*/  function tryCatchFinally() {
/////*67*/       try {
/////*68*/                          }
/////*69*/     catch (err) {
/////*70*/                                      }
/////*71*/           finally {
/////*72*/     }
/////*73*/                             }
////
////
/////*74*/  class indentBeforeCurly
/////*75*/                                          {
/////*76*/                    }
////
////
/////*77*/                               function argumentsListIndentation(bar,
/////*78*/                                 blah,
/////*79*/      );
////
////
/////*80*/     function blockIndentAfterIndentedParameter1(bar,
/////*81*/                  blah) {
/////*82*/                                      }
////
////
/////*83*/    function     blockIndentAfterIndentedParameter2(bar,
/////*84*/                                         blah) {
/////*85*/           if           (foo) {
/////*86*/        }
/////*87*/}
////
/////*88*/                                              var templateLiterals                         = `abcdefghi
/////*89*/jklmnop
/////*90*/qrstuvwxyz`;

var originalOptions = format.copyFormatOptions();
var copy = format.copyFormatOptions();
copy.BaseIndentSize = 10;
copy.IndentSize = 4;

format.setFormatOptions(copy);
format.document();

verify.currentFileContentIs(`
          module classes {
              class Bar {

                  constructor() {
                  }

                  private foo: string = "";

                  private f() {
                      var a: any[] = [[1, 2], [3, 4], 5];
                      return ((1 + 1));
                  }

                  private f2() {
                      if (true) { } { };
                  }
              }
          }


          module interfaces {
              interface Foo {

                  x: number;

                  foo(): number;
              }
          }


          module nestedModules {
              module Foo2 {
                  function f() {
                  }
                  var x: number;
              }
          }


          module Enums {
              enum Foo3 {
                  val1,
                  val2,
              }
          }


          function controlStatements() {
              for (var i = 0; i < 10; i++) {
              }

              for (var e in foo.bar) {
              }

              with (foo.bar) {
              }

              while (false) {
              }

              do {
              } while (false);

              switch (foo.bar) {
              }

              switch (foo.bar) {
                  case 1:
                      break;
                  default:
                      break;
              }
          }


          function tryCatch() {
              try {
              }
              catch (err) {
              }
          }


          function tryFinally() {
              try {
              }
              finally {
              }
          }


          function tryCatchFinally() {
              try {
              }
              catch (err) {
              }
              finally {
              }
          }


          class indentBeforeCurly {
          }


          function argumentsListIndentation(bar,
              blah,
          );


          function blockIndentAfterIndentedParameter1(bar,
              blah) {
          }


          function blockIndentAfterIndentedParameter2(bar,
              blah) {
              if (foo) {
              }
          }

          var templateLiterals = \`abcdefghi
jklmnop
qrstuvwxyz\`;`);

format.setFormatOptions(originalOptions);