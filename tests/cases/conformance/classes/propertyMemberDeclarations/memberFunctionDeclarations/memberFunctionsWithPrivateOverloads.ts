class C {
    private foo(x: number);
    private foo(x: number, y: string);
    private foo(x: any, y?: any) { }

    private bar(x: 'hi');
    private bar(x: string);
    private bar(x: number, y: string);
    private bar(x: any, y?: any) { }

    private static foo(x: number);
    private static foo(x: number, y: string);
    private static foo(x: any, y?: any) { }

    private static bar(x: 'hi');
    private static bar(x: string);
    private static bar(x: number, y: string);
    private static bar(x: any, y?: any) { }
}

class D<T> {
    private foo(x: number);
    private foo(x: T, y: T);
    private foo(x: any, y?: any) { }

    private bar(x: 'hi');
    private bar(x: string);
    private bar(x: T, y: T);
    private bar(x: any, y?: any) { }

    private static foo(x: number);
    private static foo(x: number, y: number);
    private static foo(x: any, y?: any) { }

    private static bar(x: 'hi');
    private static bar(x: string);
    private static bar(x: number, y: number);
    private static bar(x: any, y?: any) { }

}

var c: C;
var r = c.foo(1); // error

var d: D<number>;
var r2 = d.foo(2); // error

var r3 = C.foo(1); // error
var r4 = D.bar(''); // error