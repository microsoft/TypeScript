/// <reference path="fourslash.ts" />

// repro from https://github.com/microsoft/TypeScript/issues/49680#issuecomment-1249191842

//// declare function pick<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K>;
//// declare function pick2<T extends object, K extends (keyof T)[]>(obj: T, ...keys: K): Pick<T, K[number]>;
////
//// const obj = { aaa: 1, bbb: '2', ccc: true };
////
//// pick(obj, 'aaa', '/*ts1*/');
//// pick2(obj, 'aaa', '/*ts2*/');

// repro from https://github.com/microsoft/TypeScript/issues/49680#issuecomment-1273677941

//// class Q<T> {
////   public select<Keys extends keyof T>(...args: Keys[]) {}
//// }
//// new Q<{ id: string; name: string }>().select("name", "/*ts3*/");

verify.completions({ marker: ["ts1", "ts2"], exact: ["aaa", "bbb", "ccc"] });
verify.completions({ marker: ["ts3"], exact: ["name", "id"] });
