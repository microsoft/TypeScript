// @strict: true
// @noEmit: true

type Show<A, B extends A> = B extends A ? true : false;

type Conditional1<T, U extends T> = T extends unknown ? Show<T, U> : never;
type Conditional2<T, U extends T> = (T) extends unknown ? Show<T, U> : never;
type Conditional3<T, U extends T> = ((T)) extends unknown ? Show<T, U> : never;

type Mapped1<T, U extends T> = { [K in keyof T]: Show<T, U> };
type Mapped2<T, U extends T> = { [K in keyof (T)]: Show<T, U> };
type Mapped3<T, U extends T> = { [K in (keyof T)]: Show<T, U> };
type Mapped4<T, U extends T> = { [K in ((keyof (T)))]: Show<T, U> };
