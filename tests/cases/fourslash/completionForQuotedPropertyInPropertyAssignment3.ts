/// <reference path='fourslash.ts'/>

////  let configFiles1: {
////      jspm: string;
////      'jspm:browser': string;
////  } = {
////          /*0*/: "", 
////  }

////  let configFiles2: {
////      jspm: string;
////      'jspm:browser': string;
////  } = {
////         jspm: "",
////         '/*1*/': "" 
////  }

goTo.marker('0');
verify.completionListContains("jspm");
verify.completionListAllowsNewIdentifier();
verify.completionListCount(1);

goTo.marker('1');
verify.completionListContains("jspm:browser");
verify.completionListAllowsNewIdentifier();
verify.completionListCount(2);
