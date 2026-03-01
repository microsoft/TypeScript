/// <reference path='fourslash.ts'/>

// @isolatedDeclarations: true
// @declaration: true

// @Filename: /code.ts
////const Start = {
////  A: 'A',
////  B: 'B',
////} as const;
////
////const End = {
////  Y: "Y",
////  Z: "Z"
////} as const;
////export const All_Part1 = {};
////function getPart() {
////  return { M: "Z"}
////}
////
////export const All = {
////  x: 1,
////  ...Start,
////  y: 1,
////  ...getPart(),
////  ...End,
////  z: 1,
////};
verify.codeFix({
    description: "Add annotation of type 'typeof All_Part1_1 & typeof Start & typeof All_Part3 & typeof All_Part4 & typeof End & typeof All_Part6'" ,
    index: 1,
    newFileContent:
`const Start = {
  A: 'A',
  B: 'B',
} as const;

const End = {
  Y: "Y",
  Z: "Z"
} as const;
export const All_Part1 = {};
function getPart() {
  return { M: "Z"}
}

const All_Part1_1 = {
    x: 1
};
const All_Part3 = {
    y: 1
};
const All_Part4 = getPart();
const All_Part6 = {
    z: 1
};
export const All: typeof All_Part1_1 & typeof Start & typeof All_Part3 & typeof All_Part4 & typeof End & typeof All_Part6 = {
    ...All_Part1_1,
    ...Start,
    ...All_Part3,
    ...All_Part4,
    ...End,
    ...All_Part6
};`
});
