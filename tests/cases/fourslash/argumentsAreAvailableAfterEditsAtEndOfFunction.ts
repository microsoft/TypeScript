/// <reference path='fourslash.ts'/>

////module Test1 {
////	class Person {
////		children: string[];
////		constructor(public name: string, children: string[]) {
////			/**/
////		}
////	}
////}

goTo.marker();
var text = "this.children = ch";
edit.insert(text);
verify.completions({ includes: { name: "children", text: "(parameter) children: string[]" }, isNewIdentifierLocation: true });
