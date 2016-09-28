/// <reference path='fourslash.ts' />

// Exercises relative path completions going up and down 2 directories
// and the use of forward- and back-slashes and combinations thereof.

// @Filename: f1.ts
//// /*f1*/
// @Filename: f2.ts
//// /*f2*/

// @Filename: test.ts
//// /// <reference path="f/*0*/
//// /// <reference path="f1/*1*/
//// /// <reference path="f1./*2*/
//// /// <reference path="f1.t/*3*/

//// /// <reference path="./f/*4*/
//// /// <reference path="./f1/*5*/
//// /// <reference path="./f1./*6*/
//// /// <reference path="./f1.t/*7*/

