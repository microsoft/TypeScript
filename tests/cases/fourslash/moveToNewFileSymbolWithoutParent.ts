/// <reference path='fourslash.ts'/>

// Test for the debug assertion failure with symbols exported separately from declaration
// This reproduces the issue reported in #62029

// @Filename: /bar.ts
////class Bar {}
////
////export default Bar;

// @Filename: /foo.ts
////import Bar from './bar';
////
////[|function makeBar() {
////    return new Bar();
////}|]

// Check that the refactor is available
verify.applicableRefactorAvailableAtMarker("Move to a new file");