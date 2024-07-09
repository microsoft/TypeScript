/// <reference path="fourslash.ts" />
//// namespace NPR/*5*/ {
////     export class Consider/*4*/ {
////         This/*3*/ = class {
////             show/*2*/() { }
////         }
////         m/*1*/() { }
////     }
////     /**
////      * @see {Consider.prototype.m}
////      * {@link Consider#m}
////      * @see {Consider#This#show}
////      * {@link Consider.This.show}
////      * @see {NPR.Consider#This#show}
////      * {@link NPR.Consider.This#show}
////      * @see {NPR.Consider#This.show} # doesn't parse trailing .
////      * @see {NPR.Consider.This.show}
////      */
////     export function ref() { }
//// }
//// /**
////  * {@link NPR.Consider#This#show hello hello}
////  * {@link NPR.Consider.This#show}
////  * @see {NPR.Consider#This.show} # doesn't parse trailing .
////  * @see {NPR.Consider.This.show}
////  */
//// export function outerref() { }
verify.baselineFindAllReferences('1', '2', '3', '4', '5')
