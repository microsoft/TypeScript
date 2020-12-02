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
var BiMap = /** @class */ (function () {
    function BiMap() {
    }
    var BiMap_prototype = BiMap.prototype;
    BiMap_prototype.get = function (key) { return null; };
    BiMap_prototype.inverse = function () { return null; };
    return BiMap;
}());
var b = new BiMap();
var r1 = b.get('');
var i = b.inverse(); // used to get the type wrong here.
var r2b = i.get(1);
