// @strict: true
// @declaration: true

type T1 = [`wow`: boolean];
type T2 = [number, `wow`: boolean];
type T3 = [number, ...`wow`: boolean[]];
type T4 = [number, `wow`: ...boolean[]]; // error

type Prefix = 'pre';

type T5 = [`${Prefix}wow`: boolean];
type T6 = [number, `${Prefix}wow`: boolean];
type T7 = [number, ...`${Prefix}wow`: boolean[]];

type T8 = [number, `${never}wontfly`: boolean]; // no label displayed
type T9 = [number, `${any}wontfly`: boolean]; // no label displayed
type T11 = [number, `${"a" | "b"}wontfly`: boolean]; // no label displayed
type T12 = [number, `${unknown}wontfly`: boolean]; // error

type MakeTuple1<T1 extends string, T2 extends string> = [number, `second-${T1}`: string, ...`rest-${T2}`: boolean[]];
type MakeTuple2<T1, T2> = [number, `second-${T1}`: string, ...`rest-${T2}`: boolean[]]; // error

type T13 = MakeTuple1<"awesome", "tail">;
type T14 = MakeTuple1<any, "tail">;
type T15 = MakeTuple1<"a" | "b", "tail">;
