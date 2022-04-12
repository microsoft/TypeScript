/// <reference path='fourslash.ts'/>

// @Filename: localGetReferences_1.ts
////// Comment Refence Test: g/*43*/lobalVar
////// References to a variable declared in global.
/////*1*/var /*2*/globalVar: number = 2;
////
////class fooCls {
////    // References to static variable declared in a class.
////    /*3*/static /*4*/clsSVar = 1;
////    // References to a variable declared in a class.
////    /*5*/clsVar = 1;
////
////    constructor (/*6*/public /*7*/clsParam: number) {
////        //Increments
////        /*8*/globalVar++;
////        this./*9*/clsVar++;
////        fooCls./*10*/clsSVar++;
////        // References to a class parameter.
////        this./*11*/clsParam++;
////        modTest.modVar++;
////    }
////}
////
////// References to a function parameter.
/////*12*/function /*13*/foo(/*14*/x: number) {
////    // References to a variable declared in a function.
////    /*15*/var /*16*/fnVar = 1;
////
////    //Increments
////    fooCls./*17*/clsSVar++;
////    /*18*/globalVar++;
////    modTest.modVar++;
////    /*19*/fnVar++;
////
////    //Return
////    return /*20*/x++;
////}
////
////module modTest {
////    //Declare
////    export var modVar:number;
////
////    //Increments
////    /*21*/globalVar++;
////    fooCls./*22*/clsSVar++;
////    modVar++;
////
////    class testCls {
////        static boo = /*23*/foo;
////    }
////
////    function testFn(){
////        static boo = /*24*/foo;
////
////        //Increments
////        /*25*/globalVar++;
////        fooCls./*26*/clsSVar++;
////        modVar++;
////    }
////
////    module testMod {
////        var boo = /*27*/foo;
////    }
////}
////
//////Type test
////var clsTest: fooCls;
////
//////Arguments
////// References to a class argument.
////clsTest = new fooCls(/*28*/globalVar);
////// References to a function argument.
/////*29*/foo(/*30*/globalVar);
////
//////Increments
////fooCls./*31*/clsSVar++;
////modTest.modVar++;
/////*32*/globalVar = /*33*/globalVar + /*34*/globalVar;
////
//////ETC - Other cases
/////*35*/globalVar = 3;
////// References to illegal assignment.
/////*36*/foo = /*37*/foo + 1;
/////*44*/err = err++;
/////*45*/
//////Shadowed fn Parameter
////function shdw(/*38*/globalVar: number) {
////    //Increments
////    /*39*/globalVar++;
////    return /*40*/globalVar;
////}
////
//////Remotes
//////Type test
////var remoteclsTest: remotefooCls;
////
//////Arguments
////remoteclsTest = new remotefooCls(remoteglobalVar);
////remotefoo(remoteglobalVar);
////
//////Increments
////remotefooCls.remoteclsSVar++;
////remotemodTest.remotemodVar++;
////remoteglobalVar = remoteglobalVar + remoteglobalVar;
////
//////ETC - Other cases
////remoteglobalVar = 3;
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
////function(/*41*/str) {
////
////
////
////   // Reference misses function parameter.
////   return /*42*/str + " ";
////
////});

// @Filename: localGetReferences_2.ts
////var remoteglobalVar: number = 2;
////
////class remotefooCls {
////	//Declare
////	remoteclsVar = 1;
////	static remoteclsSVar = 1;
////
////	constructor(public remoteclsParam: number) {
////		//Increments
////		remoteglobalVar++;
////		this.remoteclsVar++;
////		remotefooCls.remoteclsSVar++;
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
////	remotefooCls.remoteclsSVar++;
////	remoteglobalVar++;
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
////	remoteglobalVar++;
////	remotefooCls.remoteclsSVar++;
////	remotemodVar++;
////
////	class remotetestCls {
////		static remoteboo = remotefoo;
////	}
////`
////	function remotetestFn(){
////        static remoteboo = remotefoo;
////
////		//Increments
////		remoteglobalVar++;
////		remotefooCls.remoteclsSVar++;
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
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
    '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
    '41', '42', '43', '44', '45');
