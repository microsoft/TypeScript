/// <reference path='fourslash.ts'/>

//// interface T2 {
//// 	"string key": string;
//// 	"number key": number;
//// 	"any key": string | number | symbol;
//// }

//// type K2 = "string key" | "any key";

//// function fn2<T extends T2>(obj: T, key: keyof T) {
//// 	const value/*v1*/: T[K2] = undefined as any;
//// }

//// function fn3<K extends keyof T2>(obj: T2, key: K) {
////     const value/*v2*/: T2[K] = undefined as any;;
//// }


verify.baselineQuickInfo({ "v1": [0, 1], "v2": [0, 1] });