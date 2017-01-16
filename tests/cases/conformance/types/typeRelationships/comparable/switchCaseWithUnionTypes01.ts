
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