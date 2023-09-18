//// [tests/cases/compiler/sigantureIsSubTypeIfTheyAreIdentical.ts] ////

//// [sigantureIsSubTypeIfTheyAreIdentical.ts]
interface ICache {
    get<T>(key: string): T;
}
class CacheService implements ICache { // Should not error that property type of get are incomaptible
    get<T>(key: string): T {
        return undefined;
    }
}

//// [sigantureIsSubTypeIfTheyAreIdentical.js]
var CacheService = /** @class */ (function () {
    function CacheService() {
    }
    CacheService.prototype.get = function (key) {
        return undefined;
    };
    return CacheService;
}());
