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

verify.completions(
    { marker: "0", exact: ["jspm", '"jspm:browser"'] },
    { marker: "1", exact: ["jspm", "jspm:browser"] },
);
