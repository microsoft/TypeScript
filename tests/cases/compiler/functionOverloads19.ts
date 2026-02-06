// @target: es2015
// @strict: false
function foo(bar:{b:string;});
function foo(bar:{a:string;});
function foo(bar:{a:any;}) { return {a:""} }
