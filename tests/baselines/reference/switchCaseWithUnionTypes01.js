//// [tests/cases/conformance/types/typeRelationships/comparable/switchCaseWithUnionTypes01.ts] ////

//// [switchCaseWithUnionTypes01.ts]
var strOrNum: string | number;
var numOrBool: number | boolean;
var str: string;
var num: number;
var bool: boolean;

switch (strOrNum) {
    // Identical
    case strOrNum:
        break;

    // Constituents
    case str:
    case num:
        break;

    // Overlap in constituents
    case numOrBool:
        break;

    // No relation
    case bool:
        break;
}

//// [switchCaseWithUnionTypes01.js]
var strOrNum;
var numOrBool;
var str;
var num;
var bool;
switch (strOrNum) {
    // Identical
    case strOrNum:
        break;
    // Constituents
    case str:
    case num:
        break;
    // Overlap in constituents
    case numOrBool:
        break;
    // No relation
    case bool:
        break;
}
