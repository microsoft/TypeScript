/// <reference path='fourslash.ts'/>

////declare function f<T>(x: T, y: (p: T) => T, z: (p: T) => T): T;
////var /*1*/result = /*2*/f(0, /*3*/x => null, /*4*/x => x.blahblah);

verify.quickInfos({
    1: "var result: number",
    2: "function f<number>(x: number, y: (p: number) => number, z: (p: number) => number): number",
    3: "(parameter) x: number",
    4: "(parameter) x: number"
});
