///<reference path='getReferencesAtPositionTest2.ts' />
// Comment Refence Test: globalVar
var globalVar: number = 2;

class fooCls {
    static clsSVar = 1;
    //Declare
    clsVar = 1;

    constructor (public clsParam: number) {
        //Increments
        globalVar++;
        this.clsVar++;
        fooCls.clsSVar++;
        this.clsParam++;
        modTest.modVar++;
    }
}

function foo(x: number) {
    //Declare 
    var fnVar = 1;
    
    //Increments
    fooCls.clsSVar++;
    globalVar++;
    modTest.modVar++;
    fnVar++;
    
    //Return
    return x++;
}

module modTest {
    //Declare
    export var modVar:number;
    
    //Increments
    globalVar++;
    fooCls.clsSVar++;
    modVar++;
    
    class testCls {
        static boo = foo;
    }
    
    function testFn(){
        static boo = foo;
        
        //Increments
        globalVar++;
        fooCls.clsSVar++;
        modVar++;
    }
    
    module testMod {
        var boo = foo;
    }
}

//Type test
var clsTest: fooCls;

//Arguments
clsTest = new fooCls(globalVar);
foo(globalVar);

//Increments
fooCls.clsSVar++;
modTest.modVar++;
globalVar = globalVar + globalVar;

//ETC - Other cases
globalVar = 3;
foo = foo + 1;
err = err++;
 
//Shadowed fn Parameter
function shdw(globalVar: number) {
    //Increments
    globalVar++;
    return globalVar;
}
 
//Remotes
//Type test
var remoteclsTest: remotefooCls;

//Arguments
remoteclsTest = new remotefooCls(remoteglobalVar);
remotefoo(remoteglobalVar);

//Increments
remotefooCls.remoteclsSVar++;
remotemodTest.remotemodVar++;
remoteglobalVar = remoteglobalVar + remoteglobalVar;

//ETC - Other cases
remoteglobalVar = 3;

//Find References misses method param
var



 array = ["f", "o", "o"];
 
array.forEach(


function(str) {
 


   return str + " ";
 
});
