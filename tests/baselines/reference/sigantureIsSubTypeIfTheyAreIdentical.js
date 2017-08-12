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
var CacheService = (function () {
    function CacheService() {
    }
    var proto_1 = CacheService.prototype;
    proto_1.get = function (key) {
        return undefined;
    };
    return CacheService;
}());
