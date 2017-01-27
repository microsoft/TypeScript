/// <reference path='fourslash.ts'/>

// @Filename: localGetReferences_1.ts
////// Comment Refence Test: g/*1*/lobalVar
////// References to a variable declared in global.
////var [|{| "isWriteAccess": true, "isDefinition": true |}globalVar|]: number = 2;
////
////class fooCls {
////    // References to static variable declared in a class.
////    static [|{| "isWriteAccess": true, "isDefinition": true |}clsSVar|] = 1;
////    // References to a variable declared in a class.
////    [|{| "isWriteAccess": true, "isDefinition": true |}clsVar|] = 1;
////
////    constructor (public [|{| "isWriteAccess": true, "isDefinition": true |}clsParam|]: number) {
////        //Increments
////        [|{| "isWriteAccess": true |}globalVar|]++;
////        this.[|clsVar|]++;
////        fooCls.[|clsSVar|]++;
////        // References to a class parameter.
////        this.[|clsParam|]++;
////        modTest.modVar++;
////    }
////}
////
////// References to a function parameter.
////function [|{| "isWriteAccess": true, "isDefinition": true |}foo|]([|{| "isWriteAccess": true, "isDefinition": true |}x|]: number) {
////    // References to a variable declared in a function.
////    var [|{| "isWriteAccess": true, "isDefinition": true |}fnVar|] = 1;
////
////    //Increments
////    fooCls.[|clsSVar|]++;
////    [|{| "isWriteAccess": true |}globalVar|]++;
////    modTest.modVar++;
////    [|{| "isWriteAccess": true |}fnVar|]++;
////
////    //Return
////    return [|{| "isWriteAccess": true |}x|]++;
////}
////
////module modTest {
////    //Declare
////    export var modVar:number;
////
////    //Increments
////    [|{| "isWriteAccess": true |}globalVar|]++;
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
////        [|{| "isWriteAccess": true |}globalVar|]++;
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
////[|{| "isWriteAccess": true |}globalVar|] = [|globalVar|] + [|globalVar|];
////
//////ETC - Other cases
////[|{| "isWriteAccess": true |}globalVar|] = 3;
////// References to illegal assignment.
////[|{| "isWriteAccess": true |}foo|] = [|foo|] + 1;
/////*3*/err = err++;
/////*4*/
//////Shadowed fn Parameter
////function shdw([|{| "isWriteAccess": true, "isDefinition": true, "shadow": true |}globalVar|]: number) {
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

// References to comment.
goTo.marker("1");
verify.noReferences();

// References to unresolved symbol.
goTo.marker("3");
verify.noReferences();

// References to no context.
goTo.marker("4");
verify.noReferences();

test.rangesByText().forEach((ranges, text) => {
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
