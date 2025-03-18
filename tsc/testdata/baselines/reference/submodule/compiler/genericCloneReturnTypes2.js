//// [tests/cases/compiler/genericCloneReturnTypes2.ts] ////

//// [genericCloneReturnTypes2.ts]
class MyList<T> {
    public size: number;
    public data: T[];
    constructor(n: number) {
        this.size = n;
        this.data = new Array<T>(this.size);
    }
    public clone() {
        return new MyList<T>(this.size);
    }
}
var a: MyList<string>;
var b: MyList<any> = a.clone(); // ok
var c: MyList<string> = a.clone(); // bug was there was an error on this line
var d: MyList<number> = a.clone(); // error

//// [genericCloneReturnTypes2.js]
class MyList {
    size;
    data;
    constructor(n) {
        this.size = n;
        this.data = new Array(this.size);
    }
    clone() {
        return new MyList(this.size);
    }
}
var a;
var b = a.clone();
var c = a.clone();
var d = a.clone();
