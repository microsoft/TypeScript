//// [tests/cases/compiler/targetTypeTest2.ts] ////

//// [targetTypeTest2.ts]
// Test target typing for array literals and call expressions


var a : any[] = [1,2,"3"];


function func1(stuff:any[]) { return stuff; }

function func2(stuff1:string, stuff2:number, stuff3:number) {
	return func1([stuff1, stuff2, stuff3]);
}

//// [targetTypeTest2.js]
// Test target typing for array literals and call expressions
var a = [1, 2, "3"];
function func1(stuff) { return stuff; }
function func2(stuff1, stuff2, stuff3) {
    return func1([stuff1, stuff2, stuff3]);
}
