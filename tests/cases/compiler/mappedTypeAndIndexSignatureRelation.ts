// @strict: true

type Same<T> = { [P in keyof T]: T[P] };

type T1<T extends Record<PropertyKey, number>> = T;
type T2<U extends Record<PropertyKey, number>> = T1<Same<U>>;

// Repro from #38235

type Foo<IdentifierT extends Record<PropertyKey, PropertyKey>> =
    IdentifierT
;

type Bar<IdentifierT extends Record<PropertyKey, PropertyKey>, T> =
    {
        [k in keyof T] : Foo<IdentifierT & { k : k }>
    }
;

type Merge2<T> = { [k in keyof T] : T[k] }
type Bar2<IdentifierT extends Record<PropertyKey, PropertyKey>, T> =
    {
        [k in keyof T]: Foo<Merge2<IdentifierT & { k: k }>>
    }
;

type Identity<T> = T;
type Merge3<T> = Identity<{ [k in keyof T] : T[k] }>
type Bar3<IdentifierT extends Record<PropertyKey, PropertyKey>, T> =
    {
        [k in keyof T]: Foo<Merge3<IdentifierT & { k: k }>>
    }
;
