/// <reference path='fourslash.ts'/>

////var a/*1*/ = null;                   // var a: any
////var b/*2*/ = undefined;              // var b: any
////var c/*3*/ = { x: 0, y: null };	// var c: { x: number, y: any }
////var d/*4*/ = [null, undefined];      // var d: any[]

goTo.marker('1');
verify.quickInfoIs('any');

goTo.marker('2');
verify.quickInfoIs('any');

goTo.marker('3');
verify.quickInfoIs('{ x: number; y: any; }');

goTo.marker('4');
verify.quickInfoIs('any[]');
