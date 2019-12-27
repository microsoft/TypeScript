/// <reference path='fourslash.ts' />

// @target:ES2015
// @strict:true

// target and lib do not actually work in four slash tests, so we define Map manually
//// declare class Map<K, V> { get(key: K): V; set(key: K, value: V): void;}
////[|let map = new Map<string, string>();
////map['af123'] = "";|]

verify.rangeAfterCodeFix(`let map = new Map<string, string>();
map.set('af123', "");`, /*includeWhiteSpace*/false, /*errorCode*/ undefined, /*index*/ 0);
