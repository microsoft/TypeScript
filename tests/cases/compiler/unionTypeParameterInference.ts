interface Foo<T> { prop: T; }

declare function lift<U>(value: U | Foo<U>): Foo<U>;

function unlift<U>(value: U | Foo<U>): U {
    return lift(value).prop; // error TS2322: Type '{}' is not assignable to type 'U'.
}
