declare function map<S, T>(f: (x: S) => T): (a: S[]) => T[];
var e = <K>(x: string, y?: K) => x.length;
var r99 = map(e); // should be {}[] for S since a generic lambda is not inferentially typed

declare function map2<S extends { length: number }, T>(f: (x: S) => T): (a: S[]) => T[];
var e2 = <K>(x: string, y?: K) => x.length;
var r100 = map2(e2); // type arg inference should fail for S since a generic lambda is not inferentially typed. Falls back to { length: number }