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