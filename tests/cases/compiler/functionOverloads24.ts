// @target: es2015
// @strict: false
function foo(bar:number):(b:string)=>void;
function foo(bar:string):(a:number)=>void;
function foo(bar:any):(a)=>void { return function(){} }
