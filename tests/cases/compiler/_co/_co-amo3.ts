// @strict: true
// @declaration: true
// @target: es6

declare const arrsn : string[]|number[];
declare function strmapol(x:string):string;
//declare function strmapol(x:number):number;

arrsn.map(strmapol); // 5.2.2 error
