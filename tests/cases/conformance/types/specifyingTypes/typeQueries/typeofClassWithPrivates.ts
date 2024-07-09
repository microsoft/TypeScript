class C<T> {
    private a: number;
    private static b: number;
    x: T;
    static y: T;
}

var c: C<string>;
var r: typeof C;
var r2: typeof c;