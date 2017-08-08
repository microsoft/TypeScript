//// [genericReversingTypeParameters.ts]
class BiMap<K, V> {
    private inverseBiMap: BiMap<V, K>;
    public get(key: K): V { return null; }
    public inverse(): BiMap<V, K> { return null; }
}

var b = new BiMap<string, number>();
var r1 = b.get(''); 
var i = b.inverse(); // used to get the type wrong here.
var r2b = i.get(1); 

//// [genericReversingTypeParameters.js]
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
var BiMap = (function () {
    function BiMap() {
    }
    BiMap.prototype.get = function (key) { return null; };
    BiMap.prototype.inverse = function () { return null; };
    __names(BiMap.prototype, ["get", "inverse"]);
    return BiMap;
}());
var b = new BiMap();
var r1 = b.get('');
var i = b.inverse(); // used to get the type wrong here.
var r2b = i.get(1);
