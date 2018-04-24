/// <reference path="fourslash.ts" />

// @Filename: fileA.ts
//// type LocalAlias<T> = {a: T}
//// const var/*0*/1: LocalAlias<string>
//// export type ExpAlias<T> = {b: T}
//// const var/*1*/2: ExpAlias<string>
//// export declare function doSomething<T>(arg: T): ExpAlias<T>

// @Filename: fileB.ts
//// import { doSomething, ExpAlias  } from "./fileA";
//// type FileBAlias<T> = {c: T}
//// declare const fba: FileBAlias<string>
//// const res/*2*/ult = doSomething(fba);

// @Filename: GH18754.ts
//// import "nothing"
//// type A/*3*/A = { tag: 'a', p/*4*/a: AL/*5*/L}
//// type BB = { tag: 'b', pb: ALL}
//// type ALL = AA | BB
//// declare var b/*6*/b: B/*7*/B
//// declare let a/*8*/ll: A/*9*/LL

verify.quickInfos({
    0: "const var1: LocalAlias<string>",
    1: "const var2: ExpAlias<string>",
    2: "const result: ExpAlias<FileBAlias<string>>",
    3: 'type AA = {\n    tag: "a";\n    pa: ALL;\n}',
    4: "(property) pa: ALL",
    5: "type ALL = AA | BB",
    6: "var bb: BB",
    7: 'type BB = {\n    tag: "b";\n    pb: ALL;\n}',
    8: "let all: ALL",
    9: "type ALL = AA | BB",
});
