/// <reference path='fourslash.ts' />

//@Filename: file.tsx
////function test1(param) {
////    return (
////        <span>({param})/*1*/</span>
////    );
////}
////function test2(param) {
////    return (
////        <Route routes={getRoutes()/*2*/} id={("")} other={ "" } />
////    );
////}

format.document();
goTo.marker("1");
verify.currentLineContentIs("        <span>({param})</span>");
goTo.marker("2");
verify.currentLineContentIs(`        <Route routes={getRoutes()} id={("")} other={ "" } />`);