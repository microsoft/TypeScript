/// <reference path="fourslash.ts" />

////class A {
////  bla
////  constructor/*1*/(props) {}
////}
////class B {
////  bla;
////  constructor/*2*/(props) {}
////}
////class C {
////  bla: number
////  constructor/*3*/(props) {}
////}
////class D {
////  bla: number;
////  constructor/*4*/(props) {}
////}

verify.completions({
  marker: [1, 2, 3, 4].map(String),
  includes: { name: "constructor", sortText: completion.SortText.GlobalsOrKeywords },
  isNewIdentifierLocation: true,
});
