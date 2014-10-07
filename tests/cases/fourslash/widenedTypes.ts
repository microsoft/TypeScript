/// <reference path='fourslash.ts'/>

////var /*1*/a = null;                   // var a: any
////var /*2*/b = undefined;              // var b: any
////var /*3*/c = { x: 0, y: null };	// var c: { x: number, y: any }
////var /*4*/d = [null, undefined];      // var d: any[]

goTo.marker('1');
verify.quickInfoIs('(var) a: any');

goTo.marker('2');
verify.quickInfoIs('(var) b: any');

goTo.marker('3');
verify.quickInfoIs('(var) c: {\n    x: number;\n    y: any;\n}');

goTo.marker('4');
verify.quickInfoIs('(var) d: any[]');
