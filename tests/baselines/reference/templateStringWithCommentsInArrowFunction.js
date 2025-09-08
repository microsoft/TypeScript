//// [tests/cases/conformance/es6/templates/templateStringWithCommentsInArrowFunction.ts] ////

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
const a = 1;
const f1 = () => `${
// a
a}a`;
const f2 = () => `${
// a
a}`;
