/// <reference path='fourslash.ts'/>

////var /*1*/a = null;                   // var a: any
////var /*2*/b = undefined;              // var b: any
////var /*3*/c = { x: 0, y: null };	// var c: { x: number, y: any }
////var /*4*/d = [null, undefined];      // var d: any[]

verify.quickInfos({
    1: "var a: any",
    2: "var b: any",
    3: "var c: {\n    x: number;\n    y: any;\n}",
    4: "var d: any[]"
});
