class A<T> {
    constructor(private a: string) { }
}

class B<T> {
}

function acceptA<T>(a: A<T>) { }
function acceptB<T>(b: B<T>) { }

function test<T>(x: A<T> | B<T>) {
    if (x instanceof B) {
        acceptA(x);
    }

    if (x instanceof A) {
        acceptA(x);
    }

    if (x instanceof B) {
        acceptB(x);
    }

    if (x instanceof B) {
        acceptB(x);
    }
}