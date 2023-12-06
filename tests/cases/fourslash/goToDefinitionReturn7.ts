/// <reference path="fourslash.ts" />

////function foo(a: string, b: string): string;
////function foo(a: number, b: number): number;
////function /*end*/foo(a: any, b: any): any {
////    [|/*start*/return|] a + b;
////}

verify.baselineGoToDefinition("start");
