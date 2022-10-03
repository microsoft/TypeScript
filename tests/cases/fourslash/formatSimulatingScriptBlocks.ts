/// <reference path="fourslash.ts" />

/////* BEGIN EXTERNAL SOURCE */
/////*begin5*/
////                        var a = 1;
////                        alert("/*end5*//********//*begin4*/");
////                    /*end4*/
/////* END EXTERNAL SOURCE */
////
/////* BEGIN EXTERNAL SOURCE */
/////*begin3*/
////                            var b = 1;
////
////                        var c = "/*end3*//********//*begin2*/";
////       var d = 1;
////
////            var e = "/*end2*//********//*begin1*/";
////            var f = 1;
////        /*end1*/
/////* END EXTERNAL SOURCE */

format.setOption("BaseIndentSize", 12);
format.selection("begin1", "end1");
format.selection("begin2", "end2");
format.selection("begin3", "end3");

format.setOption("BaseIndentSize", 24);
format.selection("begin4", "end4");
format.selection("begin5", "end5");

verify.currentFileContentIs("/* BEGIN EXTERNAL SOURCE */\n\n                        var a = 1;\n                        alert(\"/********/\");\n\n/* END EXTERNAL SOURCE */\n\n/* BEGIN EXTERNAL SOURCE */\n\n            var b = 1;\n\n            var c = \"/********/\";\n            var d = 1;\n\n            var e = \"/********/\";\n            var f = 1;\n\n/* END EXTERNAL SOURCE */");
