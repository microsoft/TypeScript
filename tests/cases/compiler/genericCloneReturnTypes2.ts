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