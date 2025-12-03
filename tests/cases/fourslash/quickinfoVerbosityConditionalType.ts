/// <reference path='fourslash.ts'/>

//// interface Apple {
////     color: string;
////     weight: number;
//// }
//// type StrInt = string | bigint;
//// type T1<T extends Apple | Apple[]> = T extends { color: string } ? "one apple" : StrInt;
//// function f<T extends Apple | Apple[]>(x: T1<T>): void {
////     x/*x*/;
//// }

verify.baselineQuickInfo({ "x": [0, 1, 2] });