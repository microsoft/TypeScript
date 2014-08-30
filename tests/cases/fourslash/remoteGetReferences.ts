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
////var remoteclsTest: rem/*2*/otefooCls;
////
//////Arguments
////remoteclsTest = new remotefooCls(remoteglo/*4*/balVar);
////remotefoo(remotegl/*3*/obalVar);
////
//////Increments
////remotefooCls.remoteclsSVar++;
////remotemodTest.remotemodVar++;
/////*1*/remoteglobalVar = remoteglobalVar + remoteglobalVar;
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
////   return str + " ";
////
////});

// @Filename: remoteGetReferences_2.ts
////var remoteglobalVar: number = 2;
////
////class remotefooCls {
////	//Declare
////	rem/*5*/oteclsVar = 1;
////	static r/*6*/emoteclsSVar = 1;
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

// References to a variable declared in global.
goTo.marker("1");
verify.referencesCountIs(11);

// References to a type.
goTo.marker("2");
verify.referencesCountIs(8);

// References to a function argument.
goTo.marker("3");
verify.referencesCountIs(11);

// References to a class argument.
goTo.marker("4");
verify.referencesCountIs(11);

// References to a variable declared in a class.
goTo.marker("5");
verify.referencesCountIs(2);

// References to static variable declared in a class.
goTo.marker("6");
verify.referencesCountIs(6);