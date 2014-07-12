/// <reference path="fourslash.ts" />

////var ccc: number;
////var ddd: string;

////var aaa: number;
////var bbb: string;
/////*1*/

// Disable test triggered type check
diagnostics.setEditValidation(IncrementalEditValidation.None);

goTo.marker("1");
verify.completionListContains("aaa");
verify.completionListContains("bbb");
verify.completionListContains("ccc");
verify.completionListContains("ddd");

// Checking for completion details before edit should work
verify.completionEntryDetailIs("aaa", "number");
verify.completionEntryDetailIs("ccc", "number");

// Make an edit
edit.insert("a");
edit.backspace();

// Checking for completion details after edit should work too
verify.completionEntryDetailIs("bbb", "string");
verify.completionEntryDetailIs("ddd", "string");

// Checking for completion details again before edit should work
verify.completionEntryDetailIs("aaa", "number");
verify.completionEntryDetailIs("ccc", "number");
