/// <reference path='fourslash.ts'/>

// @Filename: localGetReferences_1.ts
////// Comment Refence Test: g/*1*/lobalVar
////// References to a variable declared in global.
////[|var [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}globalVar|]: number = 2;|]
////
////class fooCls {
////    // References to static variable declared in a class.
////    [|static [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}clsSVar|] = 1;|]
////    // References to a variable declared in a class.
////    [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}clsVar|] = 1;|]
////
////    constructor ([|public [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 6 |}clsParam|]: number|]) {
////        //Increments
////        [|{| "isWriteAccess": true |}globalVar|]++;
////        this.[|{| "isWriteAccess": true |}clsVar|]++;
////        fooCls.[|{| "isWriteAccess": true |}clsSVar|]++;
////        // References to a class parameter.
////        this.[|{| "isWriteAccess": true |}clsParam|]++;
////        modTest.modVar++;
////    }
////}
////
////// References to a function parameter.
////[|function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 12 |}foo|]([|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 14 |}x|]: number|]) {
////    // References to a variable declared in a function.
////    [|var [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 16 |}fnVar|] = 1;|]
////
////    //Increments
////    fooCls.[|{| "isWriteAccess": true |}clsSVar|]++;
////    [|{| "isWriteAccess": true |}globalVar|]++;
////    modTest.modVar++;
////    [|{| "isWriteAccess": true |}fnVar|]++;
////
////    //Return
////    return [|{| "isWriteAccess": true |}x|]++;
////}|]
////
////module modTest {
////    //Declare
////    export var modVar:number;
////
////    //Increments
////    [|{| "isWriteAccess": true |}globalVar|]++;
////    fooCls.[|{| "isWriteAccess": true |}clsSVar|]++;
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
////        [|{| "isWriteAccess": true |}globalVar|]++;
////        fooCls.[|{| "isWriteAccess": true |}clsSVar|]++;
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
////fooCls.[|{| "isWriteAccess": true |}clsSVar|]++;
////modTest.modVar++;
////[|{| "isWriteAccess": true |}globalVar|] = [|globalVar|] + [|globalVar|];
////
//////ETC - Other cases
////[|{| "isWriteAccess": true |}globalVar|] = 3;
////// References to illegal assignment.
////[|{| "isWriteAccess": true |}foo|] = [|foo|] + 1;
/////*3*/err = err++;
/////*4*/
//////Shadowed fn Parameter
////function shdw([|[|{| "isWriteAccess": true, "isDefinition": true, "shadow": true, "contextRangeIndex": 39 |}globalVar|]: number|]) {
////    //Increments
////    [|{| "isWriteAccess": true, "shadow": true |}globalVar|]++;
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
////function([|{| "isWriteAccess": true, "isDefinition": true |}str|]) {
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

// References to comment / unresolved symbol / no context
verify.baselineFindAllReferences('1', '3', '4')

test.rangesByText().forEach((ranges, text) => {
    switch (text) {
        case "var globalVar: number = 2;":
        case "static clsSVar = 1;":
        case "clsVar = 1;":
        case "public clsParam: number":
        case `function foo(x: number) {
    // References to a variable declared in a function.
    var fnVar = 1;

    //Increments
    fooCls.clsSVar++;
    globalVar++;
    modTest.modVar++;
    fnVar++;

    //Return
    return x++;
}`:
        case "x: number":
        case "var fnVar = 1;":
        case "globalVar: number":
            return;
    }

    if (text === "globalVar") {
        verify.singleReferenceGroup("(parameter) globalVar: number", ranges.filter(isShadow));
        verify.singleReferenceGroup("var globalVar: number", ranges.filter(r => !isShadow(r)));
        return;
    }

    const definition = (() => {
        switch (text) {
            case "fnVar": return "(local var) fnVar: number";
            case "clsSVar": return "(property) fooCls.clsSVar: number";
            case "clsVar": return "(property) fooCls.clsVar: number";
            case "clsParam": return "(property) fooCls.clsParam: number";
            case "foo": return "function foo(x: number): number";
            case "x": return "(parameter) x: number";
            case "str": return "(parameter) str: string";
            default: throw new Error(text);
        }
    })();
    verify.singleReferenceGroup(definition, ranges);
});

function isShadow(r) {
    return r.marker && r.marker.data && r.marker.data.shadow;
}
