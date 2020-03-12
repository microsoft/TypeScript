// @strict: true
type TakeString = (s: string) => any;

// Various functions accepting an object whose properties are TakeString functions.
// Note these all use mapped types.
declare function mapped1<T extends {[P in string]: TakeString}>(obj: T): void;
declare function mapped2<T extends {[P in keyof T]: TakeString}>(obj: T): void;
declare function mapped3<T extends {[P in keyof any]: TakeString}>(obj: T): void;
declare function mapped4<T>(obj: T & {[P in keyof T]: TakeString}): void;
declare function mapped5<T, K extends keyof T>(obj: T & {[P in K]: TakeString}): void;
declare function mapped6<K extends string>(obj: {[P in K]: TakeString}): void;
declare function mapped7<K extends keyof any>(obj: {[P in K]: TakeString}): void;
declare function mapped8<K extends 'foo'>(obj: {[P in K]: TakeString}): void;
declare function mapped9<K extends 'foo'|'bar'>(obj: {[P in K]: TakeString}): void;

mapped1({foo: s => 42});
mapped2({foo: s => 42});
mapped3({foo: s => 42});
mapped4({foo: s => 42});
mapped5({foo: s => 42});
mapped6({foo: s => 42});
mapped7({foo: s => 42});
mapped8({foo: s => 42});
mapped9({foo: s => 42});