//// [tests/cases/compiler/genericReversingTypeParameters.ts] ////

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
class BiMap {
    inverseBiMap;
    get(key) { return null; }
    inverse() { return null; }
}
var b = new BiMap();
var r1 = b.get('');
var i = b.inverse(); // used to get the type wrong here.
var r2b = i.get(1);
