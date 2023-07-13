//// [tests/cases/conformance/classes/members/privateNames/privateNameInObjectLiteral-2.ts] ////

//// [privateNameInObjectLiteral-2.ts]
const obj = {
    #foo() {

    }
};


//// [privateNameInObjectLiteral-2.js]
var obj = {
    : function () {
    }
};
