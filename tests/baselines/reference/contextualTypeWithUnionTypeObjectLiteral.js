//// [tests/cases/conformance/types/union/contextualTypeWithUnionTypeObjectLiteral.ts] ////

//// [contextualTypeWithUnionTypeObjectLiteral.ts]
var str: string;
var num: number;
var strOrNumber: string | number = str || num;
var objStr: { prop: string };
var objNum: { prop: number };
var objStrOrNum1: { prop: string } | { prop: number } = objStr || objNum;
var objStrOrNum2: { prop: string | number } = objStr || objNum;
// Below is error because :
// Spec says:
// S is a union type and each constituent type of S is assignable to T.
// T is a union type and S is assignable to at least one constituent type of T.
// In case of objStrOrNum3, the S is not union Type but object Literal so we go to next step. 
// Since T is union Type we only allow the assignment of either object with property of type string or object with property of type number but do not allow object with property of type string | number
var objStrOrNum3: { prop: string } | { prop: number } = {
    prop: strOrNumber
};
var objStrOrNum4: { prop: string | number } = {
    prop: strOrNumber
};
var objStrOrNum5: { prop: string; anotherP: string; } | { prop: number } = { prop: strOrNumber };
var objStrOrNum6: { prop: string; anotherP: string; } | { prop: number } = {
    prop: strOrNumber,
    anotherP: str
};
var objStrOrNum7: { prop: string; anotherP: string; } | { prop: number; anotherP1: number } = {
    prop: strOrNumber,
    anotherP: str
};
var objStrOrNum8: { prop: string; anotherP: string; } | { prop: number; anotherP1: number } = {
    prop: strOrNumber,
    anotherP: str,
    anotherP1: num
};
interface I11 {
    commonMethodDifferentReturnType(a: string, b: number): string;
}
interface I21 {
    commonMethodDifferentReturnType(a: string, b: number): number;
}
var i11: I11;
var i21: I21;
var i11Ori21: I11 | I21 = i11;
var i11Ori21: I11 | I21 = i21;
var i11Ori21: I11 | I21 = { // Like i1
    commonMethodDifferentReturnType: (a, b) => {
        var z = a.charAt(b);
        return z;
    },
};
var i11Ori21: I11 | I21 = { // Like i2
    commonMethodDifferentReturnType: (a, b) => {
        var z = a.charCodeAt(b);
        return z;
    },
};
var strOrNumber: string | number;
var i11Ori21: I11 | I21 = { // Like i1 and i2 both
    commonMethodDifferentReturnType: (a, b) => strOrNumber,
};

//// [contextualTypeWithUnionTypeObjectLiteral.js]
var str;
var num;
var strOrNumber = str || num;
var objStr;
var objNum;
var objStrOrNum1 = objStr || objNum;
var objStrOrNum2 = objStr || objNum;
// Below is error because :
// Spec says:
// S is a union type and each constituent type of S is assignable to T.
// T is a union type and S is assignable to at least one constituent type of T.
// In case of objStrOrNum3, the S is not union Type but object Literal so we go to next step. 
// Since T is union Type we only allow the assignment of either object with property of type string or object with property of type number but do not allow object with property of type string | number
var objStrOrNum3 = {
    prop: strOrNumber
};
var objStrOrNum4 = {
    prop: strOrNumber
};
var objStrOrNum5 = { prop: strOrNumber };
var objStrOrNum6 = {
    prop: strOrNumber,
    anotherP: str
};
var objStrOrNum7 = {
    prop: strOrNumber,
    anotherP: str
};
var objStrOrNum8 = {
    prop: strOrNumber,
    anotherP: str,
    anotherP1: num
};
var i11;
var i21;
var i11Ori21 = i11;
var i11Ori21 = i21;
var i11Ori21 = {
    commonMethodDifferentReturnType: function (a, b) {
        var z = a.charAt(b);
        return z;
    },
};
var i11Ori21 = {
    commonMethodDifferentReturnType: function (a, b) {
        var z = a.charCodeAt(b);
        return z;
    },
};
var strOrNumber;
var i11Ori21 = {
    commonMethodDifferentReturnType: function (a, b) { return strOrNumber; },
};
