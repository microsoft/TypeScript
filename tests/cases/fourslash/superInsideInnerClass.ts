/// <reference path="fourslash.ts" />
////class Base {
////	constructor(n: number) {
////	}
////}
////class Derived extends Base {
////	constructor() {
////		class Nested {
////			[super(/*1*/)] = 11111
////		}
////	}
////}

goTo.marker('1');
verify.signatureHelpCountIs(0);
