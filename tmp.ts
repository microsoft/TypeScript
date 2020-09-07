// interface Itertable<T, U, Container<X>> {
//     foo1(): Container<T>;
//     foo2(): Container<U>;
//     map1<A, B>(f: (a: A) => B): (something: A) => B;
// }

// function fff(foo: Itertable<number, string, Set>) {
//     var q = foo.foo1();
//     var w = foo.foo2();
//     foo.map1
// }

// interface CommonGeric<T> {
//     func(): Set<T>;
// }

// var q: CommonGeric<number>;
// var w = q.func();

interface Monad<T<X>> {
    map1<A, B>(f: (a: A) => B): (something: A) => B;

    map<A, B>(f: (a: A) => B): (something: T<A>) => T<B>;

    lift<A>(a: A): T<A>;
    // join<A>(tta: T<T<A>>): T<A>;
}

type sn = (tmp: string) => number

function MONAD(m: Monad<Set>,f:sn) {
    // var w = m.map1(f);
    var w2 = m.map(f);
    // var q = m.lift(1);
}
 