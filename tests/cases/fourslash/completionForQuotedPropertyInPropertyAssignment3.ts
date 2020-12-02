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
////         '[|/*1*/|]': ""
////  }

const replacementSpan = test.ranges()[0]
verify.completions(
    { marker: "0", exact: ["jspm", '"jspm:browser"'] },
    { marker: "1", exact: [
        { name: "jspm", replacementSpan },
        { name: "jspm:browser", replacementSpan }
    ] }
);
