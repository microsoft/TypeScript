/// <reference path='fourslash.ts' />

// @target:ES2015
// @strict:true

// target and lib do not actually work in four slash tests, so we define Map manually
////declare class Map<K, V> { get(key: K): V; set(key:K, value: V): void; }
////let map = new Map<string, string>();
////map['a'] = map['b']


verify.codeFixAll({
    fixId: "fixMapIndexSignature",
    fixAllDescription: "Rewrite all invalid index access expressions as calls to 'get'/'set' where possible",
    newFileContent: `declare class Map<K, V> { get(key: K): V; set(key:K, value: V): void; }
let map = new Map<string, string>();
map.set('a', map.get('b'))`
});
