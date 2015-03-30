/// <reference path="fourslash.ts" />

////var ccc: number;
////var ddd: string;

////var aaa: number;
////var bbb: string;
/////*1*/

goTo.marker("1");
verify.completionListContains("aaa");
verify.completionListContains("bbb");
verify.completionListContains("ccc");
verify.completionListContains("ddd");

// Checking for completion details before edit should work
verify.completionEntryDetailIs("aaa", "var aaa: number");
verify.completionEntryDetailIs("ccc", "var ccc: number");

// Make an edit
edit.insert("a");
edit.backspace();

// Checking for completion details after edit should work too
verify.completionEntryDetailIs("bbb", "var bbb: string");
verify.completionEntryDetailIs("ddd", "var ddd: string");

// Checking for completion details again before edit should work
verify.completionEntryDetailIs("aaa", "var aaa: number");
verify.completionEntryDetailIs("ccc", "var ccc: number");
