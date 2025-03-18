//// [tests/cases/compiler/genericCloneReturnTypes.ts] ////

//// [genericCloneReturnTypes.ts]
class Bar<T> {

    public size: number;
    public t: T;

    constructor(x: number) {

        this.size = x;

    }

    public clone() {

        return new Bar<T>(this.size);

    }

}

var b: Bar<number>;

var b2 = b.clone();
var b3: Bar<string>;
b = b2;
b = b3;

//// [genericCloneReturnTypes.js]
class Bar {
    size;
    t;
    constructor(x) {
        this.size = x;
    }
    clone() {
        return new Bar(this.size);
    }
}
var b;
var b2 = b.clone();
var b3;
b = b2;
b = b3;
