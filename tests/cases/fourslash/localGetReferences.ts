/// <reference path='fourslash.ts'/>

// @Filename: localGetReferences_1.ts
////// Comment Refence Test: g/*1*/lobalVar
////// References to a variable declared in global.
////var [|globalVar|]: n/*2*/umber = 2;
////
////class fooCls {
////    // References to static variable declared in a class.
////    static [|clsSVar|] = 1;
////    // References to a variable declared in a class.
////    [|clsVar|] = 1;
////
////    constructor (public [|clsParam|]: number) {
////        //Increments
////        [|globalVar|]++;
////        this.[|clsVar|]++;
////        fooCls.[|clsSVar|]++;
////        // References to a class parameter.
////        this.[|clsParam|]++;
////        modTest.modVar++;
////    }
////}
////
////// References to a function parameter.
////function [|foo|]([|x|]: number) {
////    // References to a variable declared in a function.
////    var [|fnVar|] = 1;
////
////    //Increments
////    fooCls.[|clsSVar|]++;
////    [|globalVar|]++;
////    modTest.modVar++;
////    [|fnVar|]++;
////
////    //Return
////    return [|x|]++;
////}
////
////module modTest {
////    //Declare
////    export var modVar:number;
////
////    //Increments
////    [|globalVar|]++;
////    fooCls.[|clsSVar|]++;
////    modVar++;
////
////    class testCls {
////        static boo = [|foo|];
////    }
////
////    function testFn(){
////        static boo = [|foo|];
////
////        //Increments
////        [|globalVar|]++;
////        fooCls.[|clsSVar|]++;
////        modVar++;
////    }
////
////    module testMod {
////        var boo = [|foo|];
////    }
////}
////
//////Type test
////var clsTest: fooCls;
////
//////Arguments
////// References to a class argument.
////clsTest = new fooCls([|globalVar|]);
////// References to a function argument.
////[|foo|]([|globalVar|]);
////
//////Increments
////fooCls.[|clsSVar|]++;
////modTest.modVar++;
////[|globalVar|] = [|globalVar|] + [|globalVar|];
////
//////ETC - Other cases
////[|globalVar|] = 3;
////// References to illegal assignment.
////[|foo|] = [|foo|] + 1;
/////*3*/err = err++;
/////*4*/
//////Shadowed fn Parameter
////function shdw([|{| "shadow": true |}globalVar|]: number) {
////    //Increments
////    [|{| "shadow": true |}globalVar|]++;
////    return [|{| "shadow": true |}globalVar|];
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
////function([|str|]) {
////
////
////
////   // Reference misses function parameter.
////   return [|str|] + " ";
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

// References to comment.
goTo.marker("1");
verify.referencesAre([]);

// References to type.
goTo.marker("2");
verify.referencesAre([]);

// References to unresolved symbol.
goTo.marker("3");
verify.referencesAre([]);

// References to no context.
goTo.marker("4");
verify.referencesAre([]);

const rangesByText = test.rangesByText();
for (const text in rangesByText) {
    const ranges = rangesByText[text];
    if (text === "globalVar") {
        verify.rangesReferenceEachOther(ranges.filter(isShadow));
        verify.rangesReferenceEachOther(ranges.filter(r => !isShadow(r)));
    } else {
        verify.rangesReferenceEachOther(ranges);
    }
}

function isShadow(r) {
    return r.marker && r.marker.data && r.marker.data.shadow;
}
