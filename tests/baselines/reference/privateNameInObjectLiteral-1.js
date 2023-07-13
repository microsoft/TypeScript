//// [tests/cases/conformance/classes/members/privateNames/privateNameInObjectLiteral-1.ts] ////

//// [privateNameInObjectLiteral-1.ts]
const obj = {
    #foo: 1
};


//// [privateNameInObjectLiteral-1.js]
var obj = {
    : 1
};
