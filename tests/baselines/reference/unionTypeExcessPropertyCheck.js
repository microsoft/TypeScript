//// [tests/cases/conformance/types/union/unionTypeExcessPropertyCheck.ts] ////

//// [unionTypeExcessPropertyCheck.ts]
type AC = {
    a: string, 
    c: string
};
type B = {
    b: string
};

const ShouldAndDoesFail: AC = {
        b: 'value for b',
        c: 'value for c'
};
const ShouldAndDoesFailToo: B = {
        b: 'value for b',
        c: 'value for c'
};
const ShouldFailButWorks: AC|B = {
        b: 'value for b',
        c: 'value for c'
};

//// [unionTypeExcessPropertyCheck.js]
var ShouldAndDoesFail = {
    b: 'value for b',
    c: 'value for c'
};
var ShouldAndDoesFailToo = {
    b: 'value for b',
    c: 'value for c'
};
var ShouldFailButWorks = {
    b: 'value for b',
    c: 'value for c'
};
