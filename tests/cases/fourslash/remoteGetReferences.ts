/// <reference path='fourslash.ts'/>

// @Filename: remoteGetReferences_1.ts
////// Comment Refence Test: globalVar
////var globalVar: number = 2;
////
////class fooCls {
////    static clsSVar = 1;
////    //Declare
////    clsVar = 1;
////
////    constructor (public clsParam: number) {
////        //Increments
////        globalVar++;
////        this.clsVar++;
////        fooCls.clsSVar++;
////        this.clsParam++;
////        modTest.modVar++;
////    }
////}
////
////function foo(x: number) {
////    //Declare
////    var fnVar = 1;
////
////    //Increments
////    fooCls.clsSVar++;
////    globalVar++;
////    modTest.modVar++;
////    fnVar++;
////
////    //Return
////    return x++;
////}
////
////module modTest {
////    //Declare
////    export var modVar:number;
////
////    //Increments
////    globalVar++;
////    fooCls.clsSVar++;
////    modVar++;
////
////    class testCls {
////        static boo = foo;
////    }
////
////    function testFn(){
////        static boo = foo;
////
////        //Increments
////        globalVar++;
////        fooCls.clsSVar++;
////        modVar++;
////    }
////
////    module testMod {
////        var boo = foo;
////    }
////}
////
//////Type test
////var clsTest: fooCls;
////
//////Arguments
////clsTest = new fooCls(globalVar);
////foo(globalVar);
////
//////Increments
////fooCls.clsSVar++;
////modTest.modVar++;
////globalVar = globalVar + globalVar;
////
//////ETC - Other cases
////globalVar = 3;
////foo = foo + 1;
////err = err++;
////
//////Shadowed fn Parameter
////function shdw(globalVar: number) {
////    //Increments
////    globalVar++;
////    return globalVar;
////}
////
//////Remotes
//////Type test
////var remoteclsTest: /*1*/remotefooCls;
////
//////Arguments
////remoteclsTest = new /*2*/remotefooCls(/*3*/remoteglobalVar);
////remotefoo(/*4*/remoteglobalVar);
////
//////Increments
/////*5*/remotefooCls./*6*/remoteclsSVar++;
////remotemodTest.remotemodVar++;
/////*7*/remoteglobalVar = /*8*/remoteglobalVar + /*9*/remoteglobalVar;
////
//////ETC - Other cases
/////*10*/remoteglobalVar = 3;
////
//////Find References misses method param
////var
////
////
////
//// array = ["f", "o", "o"];
////
////array.forEach(
////
////
////function(str) {
////
////
////
////   return str + " ";
////
////});

// @Filename: remoteGetReferences_2.ts
/////*11*/var /*12*/remoteglobalVar: number = 2;
////
/////*13*/class /*14*/remotefooCls {
////	//Declare
////	/*15*/remoteclsVar = 1;
////	/*16*/static /*17*/remoteclsSVar = 1;
////
////	constructor(public remoteclsParam: number) {
////		//Increments
////		/*18*/remoteglobalVar++;
////		this./*19*/remoteclsVar++;
////		/*20*/remotefooCls./*21*/remoteclsSVar++;
////		this.remoteclsParam++;
////		remotemodTest.remotemodVar++;
////	}
////}
////
////function remotefoo(remotex: number) {
////	//Declare
////	var remotefnVar = 1;
////
////	//Increments
////	/*22*/remotefooCls./*23*/remoteclsSVar++;
////	/*24*/remoteglobalVar++;
////	remotemodTest.remotemodVar++;
////	remotefnVar++;
////
////	//Return
////	return remotex++;
////}
////
////module remotemodTest {
////	//Declare
////	export var remotemodVar: number;
////
////	//Increments
////	/*25*/remoteglobalVar++;
////	/*26*/remotefooCls./*27*/remoteclsSVar++;
////	remotemodVar++;
////
////	class remotetestCls {
////		static remoteboo = remotefoo;
////	}
////
////	function remotetestFn(){
////        static remoteboo = remotefoo;
////
////		//Increments
////		/*28*/remoteglobalVar++;
////		/*29*/remotefooCls./*30*/remoteclsSVar++;
////		remotemodVar++;
////    }
////
////	module remotetestMod {
////		var remoteboo = remotefoo;
////	}
////}

verify.baselineFindAllReferences(
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30');