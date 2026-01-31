//// [tests/cases/compiler/missingCommaInTemplateStringsArray.ts] ////

//// [missingCommaInTemplateStringsArray.ts]
var array = [
    `template string 1`
    `template string 2`
  ];

//// [missingCommaInTemplateStringsArray.js]
var array = [
    `template string 1` `template string 2`
];
