
var strAndNum: string & number;
var numAndBool: number & boolean;
var str: string;
var num: number;
var bool: boolean;

switch (strAndNum) {
    // Identical
    case strAndNum:
        break;

    // Constituents
    case str:
    case num:
        break;

    // Overlap in constituents
    case numAndBool:
        break;

    // No relation
    case bool:
        break;
}