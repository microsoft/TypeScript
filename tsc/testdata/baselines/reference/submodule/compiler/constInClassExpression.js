//// [tests/cases/compiler/constInClassExpression.ts] ////

//// [constInClassExpression.ts]
let C = class {
    const a = 4;
};


//// [constInClassExpression.js]
let C = class {
    a = 4;
};
