/// <reference path="fourslash.ts"/>

//// interface Styles {
////   alignContent: string | null;
////   alignItems: string | null;
////   alignmentBaseline: string | null;
////   // etc..
////   [key: string]: any
//// }
//// 
//// interface StyleMap {
////   [name: string]: Partial<Styles>
//// }
//// 
//// declare function createStyles<T extends StyleMap>(styles: T): T
//// 
//// createStyles({
////   x: {
////     '/*1*/': ''
////   }
//// });

verify.baselineCompletions();
