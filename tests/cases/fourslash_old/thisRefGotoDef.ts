/// <reference path='fourslash.ts' />

//// class Greeter {
////     /*def*/element: HTMLElement;
////     span: HTMLElement;
////     timerToken: number;
////     constructor(element: HTMLElement) {
////         this.element/*ref*/ = element;
////     }
//// }

verify.goToDefinition("ref", "def");
