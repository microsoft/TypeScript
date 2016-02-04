//// [signatureIsSubTypeIfTheyAreIdentical.ts]
interface ICache {
    get<T>(key: string): T;
}
class CacheService implements ICache { // Should not error that property type of get are incompatible
    get<T>(key: string): T {
        return undefined;
    }
}

//// [signatureIsSubTypeIfTheyAreIdentical.js]
var CacheService = (function () {
    function CacheService() {
    }
    CacheService.prototype.get = function (key) {
        return undefined;
    };
    return CacheService;
}());
