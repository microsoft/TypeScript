//// [tests/cases/compiler/missingCommaInTemplateStringsArray.ts] ////

//// [missingCommaInTemplateStringsArray.ts]
var array = [
    `template string 1`
    `template string 2`
  ];

//// [missingCommaInTemplateStringsArray.js]
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var array = [
    "template string 1"(__makeTemplateObject(["template string 2"], ["template string 2"]))
];
