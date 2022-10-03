// Specialized signatures must be a subtype of a non-specialized signature
// All the below should not be errors

function foo(x: 'a');
function foo(x: string);
function foo(x: any) { }

class C {
    foo(x: 'a');
    foo(x: string);
    foo(x: any) { }
}

class C2<T> {
    foo(x: 'a');
    foo(x: string);
    foo(x: T);
    foo(x: any) { }
}

class C3<T extends String> {
    foo(x: 'a');
    foo(x: string);
    foo(x: T);
    foo(x: any) { }
}

interface I {
    (x: 'a');
    (x: number);
    (x: string);
    foo(x: 'a');
    foo(x: string);
    foo(x: number);
}

interface I2<T> {
    (x: 'a');
    (x: T);
    (x: string);
    foo(x: 'a');
    foo(x: string);
    foo(x: T);
}

interface I3<T extends String> {
    (x: 'a');
    (x: string);
    (x: T);
    foo(x: 'a');
    foo(x: string);
    foo(x: T);
}

var a: {
    (x: string);
    (x: 'a');
    (x: number);
    foo(x: string);
    foo(x: 'a');
    foo(x: number);
}

var a2: {
    (x: 'a');
    (x: string);
    <T>(x: T);
    foo(x: string);
    foo(x: 'a');
    foo<T>(x: T);
}

var a3: {
    (x: 'a');
    <T>(x: T);
    (x: string);
    foo(x: string);
    foo(x: 'a');
    foo<T extends String>(x: T);
}
