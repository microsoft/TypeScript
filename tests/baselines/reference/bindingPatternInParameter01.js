//// [bindingPatternInParameter01.ts]
const nestedArray = [[[1, 2]], [[3, 4]]];

nestedArray.forEach(([[a, b]]) => {
  console.log(a, b);
});


//// [bindingPatternInParameter01.js]
var nestedArray = [[[1, 2]], [[3, 4]]];
nestedArray.forEach(function (_a) {
    var _b = _a[0], a = _b[0], b = _b[1];
    console.log(a, b);
});
