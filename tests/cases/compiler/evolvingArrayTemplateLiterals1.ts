// @strict: true
// @noEmit: true

type Vegetable = "spinach" | "carrot";

const arr1 = [];
const v1 = "carrot";
arr1.push(`vegetable_${v1}`);
arr1;

const arr2 = [];
const v2: "carrot" = "carrot";
arr2.push(`vegetable_${v2}`);
arr2;

const arr3 = [];
const v3: Vegetable = "carrot";
arr3.push(`vegetable_${v3}`);
arr3;

const arr4 = [];
declare const v4: Vegetable;
arr4.push(`vegetable_${v4}`);
arr4;
