//// [templateStringWithCommentsInArrowFunction.ts]
const a = 1;
const f1 = () =>
    `${
      // a
      a
    }a`;

const f2 = () =>
    `${
      // a
      a
    }`;


//// [templateStringWithCommentsInArrowFunction.js]
var a = 1;
var f1 = function () {
    return "" + 
    // a
    a + "a";
};
var f2 = function () {
    return "" + 
    // a
    a;
};
