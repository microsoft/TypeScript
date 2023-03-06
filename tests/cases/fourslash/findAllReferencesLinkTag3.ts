/// <reference path="fourslash.ts" />
//// namespace NPR/*5*/ {
////     export class Consider/*4*/ {
////         This/*3*/ = class {
////             show/*2*/() { }
////         }
////         m/*1*/() { }
////     }
////     /**
////      * {@linkcode Consider.prototype.m}
////      * {@linkplain Consider#m}
////      * {@linkcode Consider#This#show}
////      * {@linkplain Consider.This.show}
////      * {@linkcode NPR.Consider#This#show}
////      * {@linkplain NPR.Consider.This#show}
////      * {@linkcode NPR.Consider#This.show} # doesn't parse trailing .
////      * {@linkcode NPR.Consider.This.show}
////      */
////     export function ref() { }
//// }
//// /**
////  * {@linkplain NPR.Consider#This#show hello hello}
////  * {@linkplain NPR.Consider.This#show}
////  * {@linkcode NPR.Consider#This.show} # doesn't parse trailing .
////  * {@linkcode NPR.Consider.This.show}
////  */
//// export function outerref() { }
verify.baselineFindAllReferences('1', '2', '3', '4', '5')
