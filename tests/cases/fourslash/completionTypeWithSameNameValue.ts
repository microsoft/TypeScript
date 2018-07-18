/// <reference path="fourslash.ts" /> 
 
////declare namespace options { 
////  type Foo = { value: number; } 
////} 
////class options { 
////  constructor(options: op/*1*/) { 
////    const barOptions: opt/*2*/ 
////  } 
////} 
 
goTo.marker('1'); 
verify.completionListContains("options"); 
 
goTo.marker('2'); 
verify.completionListContains("options");