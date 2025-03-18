//// [tests/cases/compiler/genericReversingTypeParameters2.ts] ////

//// [genericReversingTypeParameters2.ts]
class BiMap<K, V> {
    private inverseBiMap: BiMap<V, K>;
    public get(key: K): V { return null; }
    public inverse(): BiMap<V, K> { return null; }
}

var b = new BiMap<string, number>();
var i = b.inverse(); // used to get the type wrong here.
var r2b = i.get(1); 

//// [genericReversingTypeParameters2.js]
class BiMap {
    inverseBiMap;
    get(key) { return null; }
    inverse() { return null; }
}
var b = new BiMap();
var i = b.inverse();
var r2b = i.get(1);
