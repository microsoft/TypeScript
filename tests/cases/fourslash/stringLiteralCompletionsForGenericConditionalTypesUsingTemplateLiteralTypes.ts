/// <reference path="fourslash.ts" />

// repro from https://github.com/microsoft/TypeScript/issues/49680

//// type PathOf<T, K extends string, P extends string = ""> =
////   K extends `${infer U}.${infer V}`
////     ? U extends keyof T ? PathOf<T[U], V, `${P}${U}.`> : `${P}${keyof T & (string | number)}`
////     : K extends keyof T ? `${P}${K}` : `${P}${keyof T & (string | number)}`;
////
//// declare function consumer<K extends string>(path: PathOf<{a: string, b: {c: string}}, K>) : number;
////
//// consumer('b./*ts*/')

verify.completions({ marker: ["ts"], exact: ["a", "b", "b.c"] });
