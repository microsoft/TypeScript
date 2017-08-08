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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var CacheService = (function () {
    function CacheService() {
    }
    CacheService.prototype.get = function (key) {
        return undefined;
    };
    __names(CacheService.prototype, ["get"]);
    return CacheService;
}());
