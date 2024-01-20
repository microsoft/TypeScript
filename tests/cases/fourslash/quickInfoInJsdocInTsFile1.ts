/// <reference path='fourslash.ts' />

/////** @type {() => { /*1*/data: string[] }} */
/////function test(): { data: string[] } {
/////  return {
/////    data: [],
/////  };
/////}

//////** @returns {{ /*2*/data: string[] }} */
/////function test2(): { data: string[] } {
/////  return {
/////    data: [],
/////  };
/////}

//////** @type {{ /*3*/bar: string; }} */
/////const test3 = { bar: '' }

verify.quickInfoAt("1", "");
verify.quickInfoAt("2", "");
verify.quickInfoAt("3", "");
