//@noimplicitany: true
// this should be errors
var arg0 = null;  // error at "arg0"
var anyArray = [null, undefined];  // error at array literal
var objL: { v; w; }             // error at "y,z"
var funcL: (y2) => number;
function temp1(arg1) { }  // error at "temp1"
function testFunctionExprC(subReplace: (s: string, ...arg: any[]) => string) { }
function testFunctionExprC2(eq: (v1: any, v2: any) => number) { };
function testObjLiteral(objLit: { v: any; w: any }) { }; 
function testFuncLiteral(funcLit: (y2) => number) { };

// this should not be an error
testFunctionExprC2((v1, v2) => 1);
testObjLiteral(objL);
testFuncLiteral(funcL);

var k = temp1(null);
var result = temp1(arg0);
var result1 = temp1(anyArray);

function noError(variable: any, array?: any) { }
noError(null, []);
noError(undefined, <any>[]);
noError(null, [null, undefined]);
noError(undefined, anyArray);

class C {
    constructor(emtpyArray: any, variable: any) {
    }
}

var newC = new C([], undefined);
var newC1 = new C([], arg0);
var newC2 = new C(<any>[], null) 
