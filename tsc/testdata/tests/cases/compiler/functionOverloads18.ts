// @target: es2015
// @strict: false
function foo(bar:{a:number;});
function foo(bar:{a:string;}) { return {a:""} }
