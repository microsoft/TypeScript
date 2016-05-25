/// <reference path="fourslash.ts"/>


// @Filename: navigationItemsModuleVariables_0.ts
//// /*file1*/
////module Module1 {
////    export var x = 0;
////}

// @Filename: navigationItemsModuleVariables_1.ts
//// /*file2*/
////module Module1.SubModule {
////    export var y = 0;
////}

// @Filename: navigationItemsModuleVariables_2.ts
//// /*file3*/
////module Module1 {
////    export var z = 0;
////}
goTo.marker("file1");
verify.navigationBarContains("Module1", "module");
verify.navigationBarContains("x", "var");
// nothing else should show up
verify.navigationBarCount(2);

goTo.marker("file2");
verify.navigationBarContains("Module1.SubModule", "module");
verify.navigationBarContains("y", "var");
verify.navigationBarCount(2);
