//// [tests/cases/compiler/typeofStripsFreshness.ts] ////

//// [typeofStripsFreshness.ts]
interface Collection<T> {
    elems: T[];
}
interface CollectionStatic {
    new <T>(): Collection<T>;
}
declare const Collection: CollectionStatic;

const ALL = "all";
type All = typeof ALL;

const result: Collection<All> = new Collection();

const ANOTHER = "another";
type Another = typeof ANOTHER;

type Both = Another | All;

const result2: Collection<Both> = new Collection();


//// [typeofStripsFreshness.js]
var ALL = "all";
var result = new Collection();
var ANOTHER = "another";
var result2 = new Collection();
