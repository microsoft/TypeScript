/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true

// @Filename: /code.ts
////const Start = [
////  'A',
////  'B',
////] as const;
////
////const End = [
////  "Y",
////  "Z"
////] as const;
////export const All_Part1 = {};
////function getPart() {
////  return ["Z"]
////}
////
////export const All = [
////  1,
////  ...Start,
////  1,
////  ...getPart(),
////  ...End,
////  1,
////] as const;
verify.codeFix({
    description: `Add annotation of type '[...typeof All_Part1_1, ...typeof Start, ...typeof All_Part3, ...typeof All_Part4, ...typeof End, ...typeof All_Part6]'` ,
    index: 1,
    newFileContent:
`const Start = [
  'A',
  'B',
] as const;

const End = [
  "Y",
  "Z"
] as const;
export const All_Part1 = {};
function getPart() {
  return ["Z"]
}

const All_Part1_1 = [
    1
] as const;
const All_Part3 = [
    1
] as const;
const All_Part4 = getPart() as const;
const All_Part6 = [
    1
] as const;
export const All: [
    ...typeof All_Part1_1,
    ...typeof Start,
    ...typeof All_Part3,
    ...typeof All_Part4,
    ...typeof End,
    ...typeof All_Part6
] = [
    ...All_Part1_1,
    ...Start,
    ...All_Part3,
    ...All_Part4,
    ...End,
    ...All_Part6
] as const;`
});
