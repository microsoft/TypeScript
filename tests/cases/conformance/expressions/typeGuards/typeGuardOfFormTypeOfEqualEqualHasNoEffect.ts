class C { private p: string };

declare var strOrNum: string | number;
declare var strOrBool: string | boolean;
declare var numOrBool: number | boolean;
declare var strOrC: string | C;

// typeof x == s has not effect on typeguard
if (typeof strOrNum == "string") {
    var r1 = strOrNum; // string | number
}
else {
    var r1 = strOrNum; // string | number
}

if (typeof strOrBool == "boolean") {
    var r2 = strOrBool; // string | boolean
}
else {
    var r2 = strOrBool; // string | boolean
}

if (typeof numOrBool == "number") {
    var r3 = numOrBool; // number | boolean
}
else {
    var r3 =  numOrBool; // number | boolean
}

if (typeof strOrC == "Object") {
    var r4 = strOrC; // string | C
}
else {
    var r4 = strOrC; // string | C
}