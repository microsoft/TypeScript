// @declaration: true

declare function randBool(): boolean;
declare function takeReturnString(str: string): string;
declare function takeReturnHello(str: "Hello"): "Hello";
declare function takeReturnHelloWorld(str: "Hello" | "World"): "Hello" | "World";

function fun1<T>(x: T, y: T) {
    return randBool() ? x : y;
}

function fun2<T, U>(x: T, y: U) {
    return randBool() ? x : y;
}

function fun3<T>(...args: T[]): T {
    return args[+randBool()];
}

namespace n1 {
    // The following should all come back as strings.
    // They should be assignable to/from something of a type 'string'.
    // They should not be assignable to either "Hello" or "World".
    export let a = fun1("Hello", "World");
    export let b = fun1("Hello", "Hello");
    export let c = fun2("Hello", "World");
    export let d = fun2("Hello", "Hello");
    export let e = fun3("Hello", "Hello", "World", "Foo");

    // Should be valid
    a = takeReturnString(a);
    b = takeReturnString(b);
    c = takeReturnString(c);
    d = takeReturnString(d);
    e = takeReturnString(e);
    
    // Passing these as arguments should cause an error.
    a = takeReturnHello(a);
    b = takeReturnHello(b);
    c = takeReturnHello(c);
    d = takeReturnHello(d);
    e = takeReturnHello(e);

    // Passing these as arguments should cause an error.
    a = takeReturnHelloWorld(a);
    b = takeReturnHelloWorld(b);
    c = takeReturnHelloWorld(c);
    d = takeReturnHelloWorld(d);
    e = takeReturnHelloWorld(e);
}

namespace n2 {
    // The following (regardless of errors) should come back typed
    // as "Hello" (or "Hello" | "Hello").
    export let a = fun1<"Hello">("Hello", "Hello");
    export let b = fun1<"Hello">("Hello", "World");
    export let c = fun2<"Hello", "Hello">("Hello", "Hello");
    export let d = fun2<"Hello", "Hello">("Hello", "World");
    export let e = fun3<"Hello">("Hello", "World");

    // Assignment from the returned value should cause an error.
    a = takeReturnString(a);
    b = takeReturnString(b);
    c = takeReturnString(c);
    d = takeReturnString(d);
    e = takeReturnString(e);

    // Should be valid
    a = takeReturnHello(a);
    b = takeReturnHello(b);
    c = takeReturnHello(c);
    d = takeReturnHello(d);
    e = takeReturnHello(e);

    // Assignment from the returned value should cause an error.
    a = takeReturnHelloWorld(a);
    b = takeReturnHelloWorld(b);
    c = takeReturnHelloWorld(c);
    d = takeReturnHelloWorld(d);
    e = takeReturnHelloWorld(e);
}


namespace n3 {
    // The following (regardless of errors) should come back typed
    // as "Hello" | "World" (or "World" | "Hello").
    export let a = fun2<"Hello", "World">("Hello", "World");
    export let b = fun2<"Hello", "World">("World", "Hello");
    export let c = fun2<"World", "Hello">("Hello", "Hello");
    export let d = fun2<"World", "Hello">("World", "World");
    export let e = fun3<"Hello" | "World">("Hello", "World");

    // Assignment from the returned value should cause an error.
    a = takeReturnString(a);
    b = takeReturnString(b);
    c = takeReturnString(c);
    d = takeReturnString(d);
    e = takeReturnString(e);

    // Passing these as arguments should cause an error.
    a = takeReturnHello(a);
    b = takeReturnHello(b);
    c = takeReturnHello(c);
    d = takeReturnHello(d);
    e = takeReturnHello(e);

    // Both should be valid.
    a = takeReturnHelloWorld(a);
    b = takeReturnHelloWorld(b);
    c = takeReturnHelloWorld(c);
    d = takeReturnHelloWorld(d);
    e = takeReturnHelloWorld(e);
}