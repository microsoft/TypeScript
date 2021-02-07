/// <reference path='fourslash.ts' />

// @target:ES2015
// @strict:true

// target and lib do not actually work in four slash tests, so we define Map manually
////declare class Map<K, V> { get(key: K): V; set(key:K, value: V): void; }
////let map = new Map<string, string>();
////map['a'] = map['b'];
////map['a'] = (map['b'] = map['c']);
////let mapobj = = new Map<string, { foo: string }>();
////mapobj['a'].foo = "a";
////map['a'] //f


verify.codeFixAll({
    fixId: "fixMapIndexSignature",
    fixAllDescription: "Rewrite all invalid index access expressions as calls to 'get'/'set' where possible",
    newFileContent: `declare class Map<K, V> { get(key: K): V; set(key:K, value: V): void; }
let map = new Map<string, string>();
map.set('a', map.get('b'));
map.set('a', (map.set('b', map.get('c'))));
let mapobj = = new Map<string, { foo: string }>();
mapobj.get('a').foo = "a";
map.get('a') //f`
});
