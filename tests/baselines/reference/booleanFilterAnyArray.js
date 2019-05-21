//// [booleanFilterAnyArray.ts]
interface Bullean { }
interface BulleanConstructor {
    new(v1?: any): Bullean;
    <T>(v2?: T): v2 is T;
}

interface Ari<T> {
    filter<S extends T>(cb1: (value: T) => value is S): Ari<S>;
    filter(cb2: (value: T) => unknown): Ari<T>;
}
declare var Bullean: BulleanConstructor;
declare let anys: Ari<any>;
var xs: Ari<any>;
var xs = anys.filter(Bullean)

declare let realanys: any[];
var ys = realanys.filter(Boolean)


//// [booleanFilterAnyArray.js]
var xs;
var xs = anys.filter(Bullean);
var ys = realanys.filter(Boolean);
