//// [tests/cases/compiler/genericFunctionsWithOptionalParameters3.ts] ////

//// [genericFunctionsWithOptionalParameters3.ts]
class Collection<T> {
    public add(x: T) { }
}
interface Utils {
    fold<T, S>(c?: Collection<T>, folder?: (s: S, t: T) => T, init?: S): T;
    mapReduce<T, U, V>(c: Collection<T>, mapper: (x: T) => U, reducer: (y: U) => V): Collection<V>;
}
var utils: Utils;
var c = new Collection<string>();
var r3 = utils.mapReduce(c, (x) => { return 1 }, (y) => { return new Date() });
var r4 = utils.mapReduce(c, (x: string) => { return 1 }, (y: number) => { return new Date() });
var f1 = (x: string) => { return 1 };
var f2 = (y: number) => { return new Date() };
var r5 = utils.mapReduce(c, f1, f2);


//// [genericFunctionsWithOptionalParameters3.js]
var Collection = /** @class */ (function () {
    function Collection() {
    }
    Collection.prototype.add = function (x) { };
    return Collection;
}());
var utils;
var c = new Collection();
var r3 = utils.mapReduce(c, function (x) { return 1; }, function (y) { return new Date(); });
var r4 = utils.mapReduce(c, function (x) { return 1; }, function (y) { return new Date(); });
var f1 = function (x) { return 1; };
var f2 = function (y) { return new Date(); };
var r5 = utils.mapReduce(c, f1, f2);
