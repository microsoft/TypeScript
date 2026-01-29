//// [tests/cases/compiler/bindingPatternInParameter01.ts] ////

//// [bindingPatternInParameter01.ts]
const nestedArray = [[[1, 2]], [[3, 4]]];

nestedArray.forEach(([[a, b]]) => {
  console.log(a, b);
});


//// [bindingPatternInParameter01.js]
const nestedArray = [[[1, 2]], [[3, 4]]];
nestedArray.forEach(([[a, b]]) => {
    console.log(a, b);
});
