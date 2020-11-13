/// <reference path="fourslash.ts"/>

const variableOne = 1;
const variableTwo = 2;
const objAny: any = {
  v/*1*/
}
const objNone = {
  v/*2*/
}

interface Typed {
  variableThree: number;
}
const typed: Typed = {
  v/*3*/
}

verify.completions(
    { marker: ["1", "2"], includes: ["variableOne", "variableTwo"]},
    { marker: "3", includes: ["variableThree"], excludes: ["variableOne", "variableTwo"]},
);
