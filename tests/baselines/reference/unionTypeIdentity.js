//// [unionTypeIdentity.ts]
// Two types are considered identical when
// they are union types with identical sets of constituent types, or
var strOrNum: string | boolean;
var strOrNum: boolean | string;
var strOrNum: boolean | string | boolean;
var strOrNum: string; // error
var strOrNum: boolean; // error
var strOrNum: number; // error

//// [unionTypeIdentity.js]
// Two types are considered identical when
// they are union types with identical sets of constituent types, or
var strOrNum;
var strOrNum;
var strOrNum;
var strOrNum; // error
var strOrNum; // error
var strOrNum; // error
