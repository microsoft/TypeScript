/// <reference path='fourslash.ts'/>

//// interface Apple {
////     color: string;
////     size: number;
//// }

//// function f(): Promise<Apple> {
////     return Promise.resolve({ color: "red", size: 5 });
//// }

//// const g/*g*/ = f;
//// const u/*u*/: Map<string, Apple> = new Map;

verify.baselineQuickInfo({ "g": [0, 1], "u": [0, 1] });