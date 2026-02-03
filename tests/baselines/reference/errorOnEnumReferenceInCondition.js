//// [tests/cases/compiler/errorOnEnumReferenceInCondition.ts] ////

//// [errorOnEnumReferenceInCondition.ts]
enum Nums {
    Zero = 0,
    One = 1,
}

const a = Nums.Zero ? "a" : "b";
const b = Nums.One ? "a" : "b";

if (Nums.Zero) {
    Nums;
}
else {
    Nums;
}


if (Nums.One) {
    Nums;
}
else {
    Nums;
}


enum Strs {
    Empty = "",
    A = "A",
}

const c = Strs.Empty ? "a" : "b";
const d = Strs.A ? "a" : "b";

if (Strs.Empty) {
    Strs;
}
else {
    Strs;
}


if (Strs.A) {
    Strs;
}
else {
    Strs;
}

//// [errorOnEnumReferenceInCondition.js]
"use strict";
var Nums;
(function (Nums) {
    Nums[Nums["Zero"] = 0] = "Zero";
    Nums[Nums["One"] = 1] = "One";
})(Nums || (Nums = {}));
var a = Nums.Zero ? "a" : "b";
var b = Nums.One ? "a" : "b";
if (Nums.Zero) {
    Nums;
}
else {
    Nums;
}
if (Nums.One) {
    Nums;
}
else {
    Nums;
}
var Strs;
(function (Strs) {
    Strs["Empty"] = "";
    Strs["A"] = "A";
})(Strs || (Strs = {}));
var c = Strs.Empty ? "a" : "b";
var d = Strs.A ? "a" : "b";
if (Strs.Empty) {
    Strs;
}
else {
    Strs;
}
if (Strs.A) {
    Strs;
}
else {
    Strs;
}
