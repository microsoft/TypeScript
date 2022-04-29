function identity<A>(a: A): A {
    return a;
}
var x = [1, 2, 3].map(identity)[0];