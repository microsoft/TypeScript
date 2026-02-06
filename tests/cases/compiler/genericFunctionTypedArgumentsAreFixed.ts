// @target: es2015
declare function map<T, U>(f: (x: T) => U, xs: T[]): U[];
map((a) => a.length, [1]);