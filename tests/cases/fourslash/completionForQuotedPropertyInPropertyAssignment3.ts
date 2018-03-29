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

verify.completionsAt("0", ["jspm", '"jspm:browser"']);
verify.completionsAt("1", ["jspm", "jspm:browser"]);
