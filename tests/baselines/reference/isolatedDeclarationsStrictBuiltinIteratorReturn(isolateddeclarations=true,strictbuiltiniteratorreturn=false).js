//// [tests/cases/compiler/isolatedDeclarationsStrictBuiltinIteratorReturn.ts] ////

//// [isolatedDeclarationsStrictBuiltinIteratorReturn.ts]
declare let x1: Iterable<number>;
declare let x2: Iterable<number, any>;
declare let x3: Iterable<number, any, any>;
declare let x4: Iterable<number, undefined>;
declare let x5: Iterable<number, undefined, any>;
declare let x6: Iterable<number, BuiltinIteratorReturn>;
declare let x7: Iterable<number, BuiltinIteratorReturn, any>;

declare let x8: IterableIterator<number>;
declare let x9: IterableIterator<number, any>;
declare let x10: IterableIterator<number, any, any>;
declare let x11: IterableIterator<number, undefined>;
declare let x12: IterableIterator<number, undefined, any>;
declare let x13: IterableIterator<number, BuiltinIteratorReturn>;
declare let x14: IterableIterator<number, BuiltinIteratorReturn, any>;

declare function f1(): Iterable<number>;
declare function f2(): Iterable<number, any>;
declare function f3(): Iterable<number, any, any>;
declare function f4(): Iterable<number, undefined>;
declare function f5(): Iterable<number, undefined, any>;
declare function f6(): Iterable<number, BuiltinIteratorReturn>;
declare function f7(): Iterable<number, BuiltinIteratorReturn, any>;

declare function f8(): IterableIterator<number>;
declare function f9(): IterableIterator<number, any>;
declare function f10(): IterableIterator<number, any, any>;
declare function f11(): IterableIterator<number, undefined>;
declare function f12(): IterableIterator<number, undefined, any>;
declare function f13(): IterableIterator<number, BuiltinIteratorReturn>;
declare function f14(): IterableIterator<number, BuiltinIteratorReturn, any>;

const a1 = (): Iterable<number> => null!;
const a2 = (): Iterable<number, any> => null!;
const a3 = (): Iterable<number, any, any> => null!;
const a4 = (): Iterable<number, undefined> => null!;
const a5 = (): Iterable<number, undefined, any> => null!;
const a6 = (): Iterable<number, BuiltinIteratorReturn> => null!;
const a7 = (): Iterable<number, BuiltinIteratorReturn, any> => null!;

const a8 = (): IterableIterator<number> => null!;
const a9 = (): IterableIterator<number, any> => null!;
const a10 = (): IterableIterator<number, any, any> => null!;
const a11 = (): IterableIterator<number, undefined> => null!;
const a12 = (): IterableIterator<number, undefined, any> => null!;
const a13 = (): IterableIterator<number, BuiltinIteratorReturn> => null!;
const a14 = (): IterableIterator<number, BuiltinIteratorReturn, any> => null!;

//// [isolatedDeclarationsStrictBuiltinIteratorReturn.js]
const a1 = () => null;
const a2 = () => null;
const a3 = () => null;
const a4 = () => null;
const a5 = () => null;
const a6 = () => null;
const a7 = () => null;
const a8 = () => null;
const a9 = () => null;
const a10 = () => null;
const a11 = () => null;
const a12 = () => null;
const a13 = () => null;
const a14 = () => null;


//// [isolatedDeclarationsStrictBuiltinIteratorReturn.d.ts]
declare let x1: Iterable<number>;
declare let x2: Iterable<number, any>;
declare let x3: Iterable<number, any, any>;
declare let x4: Iterable<number, undefined>;
declare let x5: Iterable<number, undefined, any>;
declare let x6: Iterable<number, BuiltinIteratorReturn>;
declare let x7: Iterable<number, BuiltinIteratorReturn, any>;
declare let x8: IterableIterator<number>;
declare let x9: IterableIterator<number, any>;
declare let x10: IterableIterator<number, any, any>;
declare let x11: IterableIterator<number, undefined>;
declare let x12: IterableIterator<number, undefined, any>;
declare let x13: IterableIterator<number, BuiltinIteratorReturn>;
declare let x14: IterableIterator<number, BuiltinIteratorReturn, any>;
declare function f1(): Iterable<number>;
declare function f2(): Iterable<number, any>;
declare function f3(): Iterable<number, any, any>;
declare function f4(): Iterable<number, undefined>;
declare function f5(): Iterable<number, undefined, any>;
declare function f6(): Iterable<number, BuiltinIteratorReturn>;
declare function f7(): Iterable<number, BuiltinIteratorReturn, any>;
declare function f8(): IterableIterator<number>;
declare function f9(): IterableIterator<number, any>;
declare function f10(): IterableIterator<number, any, any>;
declare function f11(): IterableIterator<number, undefined>;
declare function f12(): IterableIterator<number, undefined, any>;
declare function f13(): IterableIterator<number, BuiltinIteratorReturn>;
declare function f14(): IterableIterator<number, BuiltinIteratorReturn, any>;
declare const a1: () => Iterable<number>;
declare const a2: () => Iterable<number, any>;
declare const a3: () => Iterable<number, any, any>;
declare const a4: () => Iterable<number, undefined>;
declare const a5: () => Iterable<number, undefined, any>;
declare const a6: () => Iterable<number, BuiltinIteratorReturn>;
declare const a7: () => Iterable<number, BuiltinIteratorReturn, any>;
declare const a8: () => IterableIterator<number>;
declare const a9: () => IterableIterator<number, any>;
declare const a10: () => IterableIterator<number, any, any>;
declare const a11: () => IterableIterator<number, undefined>;
declare const a12: () => IterableIterator<number, undefined, any>;
declare const a13: () => IterableIterator<number, BuiltinIteratorReturn>;
declare const a14: () => IterableIterator<number, BuiltinIteratorReturn, any>;
