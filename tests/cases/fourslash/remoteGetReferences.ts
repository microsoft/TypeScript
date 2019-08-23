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
////var remoteclsTest: [|remotefooCls|];
////
//////Arguments
////remoteclsTest = new [|remotefooCls|]([|remoteglobalVar|]);
////remotefoo([|remoteglobalVar|]);
////
//////Increments
////[|remotefooCls|].[|{| "isWriteAccess": true |}remoteclsSVar|]++;
////remotemodTest.remotemodVar++;
////[|{| "isWriteAccess": true |}remoteglobalVar|] = [|remoteglobalVar|] + [|remoteglobalVar|];
////
//////ETC - Other cases
////[|{| "isWriteAccess": true |}remoteglobalVar|] = 3;
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
////[|var [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 10 |}remoteglobalVar|]: number = 2;|]
////
////[|class [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 12 |}remotefooCls|] {
////	//Declare
////	[|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 14 |}remoteclsVar|] = 1;|]
////	[|static [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 16 |}remoteclsSVar|] = 1;|]
////
////	constructor(public remoteclsParam: number) {
////		//Increments
////		[|{| "isWriteAccess": true |}remoteglobalVar|]++;
////		this.[|{| "isWriteAccess": true |}remoteclsVar|]++;
////		[|remotefooCls|].[|{| "isWriteAccess": true |}remoteclsSVar|]++;
////		this.remoteclsParam++;
////		remotemodTest.remotemodVar++;
////	}
////}|]
////
////function remotefoo(remotex: number) {
////	//Declare
////	var remotefnVar = 1;
////
////	//Increments
////	[|remotefooCls|].[|{| "isWriteAccess": true |}remoteclsSVar|]++;
////	[|{| "isWriteAccess": true |}remoteglobalVar|]++;
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
////	[|{| "isWriteAccess": true |}remoteglobalVar|]++;
////	[|remotefooCls|].[|{| "isWriteAccess": true |}remoteclsSVar|]++;
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
////		[|{| "isWriteAccess": true |}remoteglobalVar|]++;
////		[|remotefooCls|].[|{| "isWriteAccess": true |}remoteclsSVar|]++;
////		remotemodVar++;
////    }
////
////	module remotetestMod {
////		var remoteboo = remotefoo;
////	}
////}

test.rangesByText().forEach((ranges, text) => {
    // Definitions
    if (text === "var remoteglobalVar: number = 2;" ||
        text === `class remotefooCls {
	//Declare
	remoteclsVar = 1;
	static remoteclsSVar = 1;

	constructor(public remoteclsParam: number) {
		//Increments
		remoteglobalVar++;
		this.remoteclsVar++;
		remotefooCls.remoteclsSVar++;
		this.remoteclsParam++;
		remotemodTest.remotemodVar++;
	}
}` ||
        text == "remoteclsVar = 1;" ||
        text === "static remoteclsSVar = 1;"
    ) return;

    const definition = (() => {
        switch (text) {
            case "remotefooCls": return "class remotefooCls";
            case "remoteglobalVar": return "var remoteglobalVar: number";
            case "remoteclsSVar": return "(property) remotefooCls.remoteclsSVar: number";
            case "remoteclsVar": return "(property) remotefooCls.remoteclsVar: number";
            default: throw new Error(text);
        }
    })();

    verify.singleReferenceGroup(definition, ranges);
});
