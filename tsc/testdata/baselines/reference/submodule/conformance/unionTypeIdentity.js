//// [tests/cases/conformance/types/typeRelationships/typeAndMemberIdentity/unionTypeIdentity.ts] ////

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
var strOrNum;
var strOrNum;
var strOrNum;
var strOrNum;
var strOrNum;
var strOrNum;
