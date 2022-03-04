/// <reference path='fourslash.ts' />

////interface F1 { x: number; y: number; }
////type T1 = [number, number];
////
////function /*a*/foo/*b*/(num: number) {
////   switch (num) {
////      case 1:
////         return { x: num, y: num } as F1;
////      case 2:
////         return [num, num] as T1;
////      default:
////         return num;
////   }
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Infer function return type",
    actionName: "Infer function return type",
    actionDescription: "Infer function return type",
    newContent:
`interface F1 { x: number; y: number; }
type T1 = [number, number];

function foo(num: number): number | F1 | T1 {
   switch (num) {
      case 1:
         return { x: num, y: num } as F1;
      case 2:
         return [num, num] as T1;
      default:
         return num;
   }
}`
});
