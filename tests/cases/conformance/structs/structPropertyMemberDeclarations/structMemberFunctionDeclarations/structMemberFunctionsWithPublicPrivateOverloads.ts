// doc 4.2
// All overloads of a member function must have the same accessibility (public or private) and
// kind (instance or static).
struct C {
    private foo(x: number);
    public foo(x: number, y: string); // error
    private foo(x: any, y?: any) { }

    private bar(x: 'hi');
    public bar(x: string); // error
    private bar(x: number, y: string);
    private bar(x: any, y?: any) { }

    private static foo(x: number);
    public static foo(x: number, y: string); // error
    private static foo(x: any, y?: any) { }

    private static bar(x: 'hi');
    public static bar(x: string); // error
    private static bar(x: number, y: string);
    private static bar(x: any, y?: any) { }
}

var c: C;
var r = c.foo(1); // error

/* struct D<T> {
    private foo(x: number); 
    public foo(x: T, y: T); // error
    private foo(x: any, y?: any) { }

    private bar(x: 'hi');
    public bar(x: string); // error
    private bar(x: T, y: T);
    private bar(x: any, y?: any) { }

    private baz(x: string); 
    protected baz(x: number, y: string); // error
    private baz(x: any, y?: any) { }

    private static foo(x: number);
    public static foo(x: number, y: string); // error
    private static foo(x: any, y?: any) { }

    private static bar(x: 'hi');
    public static bar(x: string); // error
    private static bar(x: number, y: string);
    private static bar(x: any, y?: any) { }

    public static baz(x: string); // error
    protected static baz(x: number, y: string);
    protected static baz(x: any, y?: any) { }
}

var d: D<number>;
var r2 = d.foo(2); // error
*/