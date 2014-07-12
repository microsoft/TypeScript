/// <reference path='fourslash.ts'/>

// @Filename: localGetReferences_1.ts
////// Comment Refence Test: g/*1*/lobalVar
////var g/*3*/lobalVar: n/*2*/umber = 2;
////
////class fooCls {
////    static clsS/*5*/Var = 1;
////    //Declare
////    cls/*4*/Var = 1;
////
////    constructor (public clsParam: number) {
////        //Increments
////        globalVar++;
////        this.clsVar++;
////        fooCls.clsSVar++;
////        this.cls/*7*/Param++;
////        modTest.modVar++;
////    }
////}
////
////function foo(/*8*/x: number) {
////    //Declare
////    var fn/*6*/Var = 1;
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
////clsTest = new fooCls(globalV/*10*/ar);
////foo(glo/*9*/balVar);
////
//////Increments
////fooCls.clsSVar++;
////modTest.modVar++;
////globalVar = globalVar + globalVar;
////
//////ETC - Other cases
////globalVar = 3;
/////*11*/foo = foo + 1;
/////*12*/err = err++;
/////*13*/
//////Shadowed fn Parameter
////function shdw(globa/*14*/lVar: number) {
////    //Increments
////    globalVar++;
////    return globalVar;
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
////function(str) {
////
////
////
////   return /*15*/str + " ";
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
////
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

// References to comment.
goTo.marker("1");
verify.referencesCountIs(0);

// References to type.
goTo.marker("2");
verify.referencesCountIs(0);

// References to a variable declared in global.
goTo.marker("3");
verify.referencesCountIs(11);

// References to a variable declared in a class.
goTo.marker("4");
verify.referencesCountIs(2);

// References to static variable declared in a class.
goTo.marker("5");
verify.referencesCountIs(6);

// References to a variable declared in a function.
goTo.marker("6");
verify.referencesCountIs(2);

// References to a class parameter.
goTo.marker("7");
verify.referencesCountIs(2);

// References to a function parameter.
goTo.marker("8");
verify.referencesCountIs(2);

// References to a function argument.
goTo.marker("9");
verify.referencesCountIs(11);

// References to a class argument.
goTo.marker("10");
verify.referencesCountIs(11);

// References to illegal assignment.
goTo.marker("11");
verify.referencesCountIs(7);

// References to unresolved symbol.
goTo.marker("12");
verify.referencesCountIs(1);

// References to no context.
goTo.marker("13");
verify.referencesCountIs(0);

// References to shadowed function parameter.
goTo.marker("14");
verify.referencesCountIs(3);

// Reference misses function parameter.
goTo.marker("15");
verify.referencesCountIs(2);