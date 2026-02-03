//// [tests/cases/compiler/restParameters.ts] ////

//// [restParameters.ts]
function f18(a?:string, ...b:number[]){}
 
function f19(a?:string, b?:number, ...c:number[]){}
 
function f20(a:string, b?:string, ...c:number[]){}
 
function f21(a:string, b?:string, c?:number, ...d:number[]){}

//// [restParameters.js]
function f18(a, ...b) { }
function f19(a, b, ...c) { }
function f20(a, b, ...c) { }
function f21(a, b, c, ...d) { }
