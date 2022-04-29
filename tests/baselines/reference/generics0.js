//// [generics0.ts]
interface G<T> {
    x: T;
}

var v2: G<string>;

var z = v2.x; // 'y' should be of type 'string'

//// [generics0.js]
var v2;
var z = v2.x; // 'y' should be of type 'string'


//// [generics0.d.ts]
interface G<T> {
    x: T;
}
declare var v2: G<string>;
declare var z: string;
