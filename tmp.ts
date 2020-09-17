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

// interface Monad<T<X>> {
//     map1<A, B>(f: (a: A) => B): (something: A) => B;

//     map<A, B>(f: (a: A) => B): (something: T<A>) => T<B>;

//     lift<A>(a: A): T<A>;
//     // join<A>(tta: T<T<A>>): T<A>;
// }

// type sn = (tmp: string) => number

// function MONAD(m: Monad<Set>,f:sn) {
//     // var w = m.map1(f);
//     var w2 = m.map(f);
//     // var q = m.lift(1);
// }

// 2800 "Type Constructor Polymorphism type parameter {0} could not accept proper type {1}"
// 2801 "Proper Constructor Polymorphism type parameter {0} could not accept Generic type {1} "
// 2802 "Type Constructor Polymorphism type parameter {0} could not have constraint"

// NOTE: 2801 is a strict error which limits a lot of things,
// like `type Q<Container<X>> = Partial<Container>`

// NOTE: 2802 is not need, but I do not know how to handle constraint for type constructor polymorphism. You can see my example in the PR to help.

// test1
interface Generic<T>{}
interface TypeConstructor<Container<X>>{}

const foo1: TypeConstructor<number>  // error: Type Constructor Polymorphism type parameter {0} could not accept proper type {1}
const foo2: TypeConstructor<Generic> // no error
const foo3: TypeConstructor<Generic<>> // error: Generic type 'Generic<T>' requires 1 type argument(s).
const foo4: TypeConstructor<TypeConstructor> //
const foo5: TypeConstructor<TypeConstructor<>> // error:
const foo6: Generic<number> //
const foo7: Generic<Generic> //
const foo8: Generic<Generic<>> //
const foo9: Generic<TypeConstructor> //
const foo9: Generic<TypeConstructor<>> //
