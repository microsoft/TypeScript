// @declaration: true
interface G<T> {
    x: T;
}

var v2: G<string>;

var z = v2.x; // 'y' should be of type 'string'