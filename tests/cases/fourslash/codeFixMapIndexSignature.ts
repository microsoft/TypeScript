/// <reference path='fourslash.ts' />

// @target:ES2015
// @strict:true

// target and lib do not actually work in four slash tests, so we define Map manually
//// declare class Map<K, V> { get(key: string): V; }
////[|let map = new Map<string, string>();
////map['a'] = map['b']|];

verify.rangeAfterCodeFix(`let map = new Map<string, string>();
map.set('a', map.get('b'))`, /*includeWhiteSpace*/false, /*errorCode*/ undefined, /*index*/ 0);
