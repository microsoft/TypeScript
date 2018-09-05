///<reference path="fourslash.ts" />

//// class Parent {
////     protected shouldWork() {
////         console.log();
////     }
//// }
//// 
//// class Child extends Parent {
////     protected hmm: string;
////     /*1*/
//// }


goTo.marker("1");
verify.completionListContains("shouldWork", "(method) Parent.shouldWork(): void", /*documentation*/ undefined, "method");