//// [booleanFilterAnyArray.ts]
interface Bullean { }
interface BulleanConstructor {
    new(v1?: any): Bullean;
    <T>(v2?: T): v2 is T;
}

interface Ari<T> {
    filter<S extends T>(cb1: (value: T) => value is S): T extends any ? Ari<any> : Ari<S>;
    filter(cb2: (value: T) => unknown): Ari<T>;
}
declare var Bullean: BulleanConstructor;
declare let anys: Ari<any>;
var xs: Ari<any>;
var xs = anys.filter(Bullean)

declare let realanys: any[];
var ys: any[];
var ys = realanys.filter(Boolean)

var foo = [{ name: 'x' }]
var foor: Array<{name: string}>
var foor = foo.filter(x => x.name)
var foos: Array<boolean>
var foos = [true, true, false, null].filter((thing): thing is boolean => thing !== null)


//// [booleanFilterAnyArray.js]
var xs;
var xs = anys.filter(Bullean);
var ys;
var ys = realanys.filter(Boolean);
var foo = [{ name: 'x' }];
var foor;
var foor = foo.filter(function (x) { return x.name; });
var foos;
var foos = [true, true, false, null].filter(function (thing) { return thing !== null; });
