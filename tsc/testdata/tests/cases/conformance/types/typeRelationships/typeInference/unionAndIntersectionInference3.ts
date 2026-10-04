// @strict: true
// @target: esnext

// Repro from #30720

type Maybe<T> = T | undefined;
declare function concatMaybe<T>(...args: (Maybe<T> | Maybe<T>[])[]): T[];
concatMaybe([1, 2, 3], 4);

// Repros from #32247

const g: <U, R, S>(com: () => Iterator<S, U, R> | AsyncIterator<S, U, R>) => Promise<U> = async <U, R, S>(com: () => Iterator<S, U, R> | AsyncIterator<S, U, R>): Promise<U> => {
  throw com;
};

interface Foo1<T> {
    test(value: T): void;
}

interface Bar1<T> {
    test(value: T | PromiseLike<T>): void;
}

declare let f1: <T>(x: Foo1<T> | Bar1<T>) => Promise<T>;
declare let f2: <U>(x: Foo1<U> | Bar1<U>) => Promise<U>;

f1 = f2;
f2 = f1;

type Foo2<T> = {
    test(value: T): void;
}

type Bar2<T> = {
    test(value: T | PromiseLike<T>): void;
}

declare let g1: <T>(x: Foo2<T> | Bar2<T>) => Promise<T>;
declare let g2: <U>(x: Foo2<U> | Bar2<U>) => Promise<U>;

g1 = g2;
g2 = g1;

// Repro from #32572

declare function foo1<T>(obj: string[] & Iterable<T>): T;
declare function foo2<T>(obj: string[] & T): T;

declare let sa: string[];
declare let sx: string[] & { extra: number };

let x1 = foo1(sa);  // string
let y1 = foo1(sx);  // string

let x2 = foo2(sa);  // unknown
let y2 = foo2(sx);  // { extra: number }

// Repro from #33490

declare class Component<P> { props: P }

export type ComponentClass<P> = new (props: P) => Component<P>;
export type FunctionComponent<P> = (props: P) => null;

export type ComponentType<P> = FunctionComponent<P> | ComponentClass<P>;

export interface RouteComponentProps { route: string }

declare function withRouter<
  P extends RouteComponentProps,
  C extends ComponentType<P>
>(
  component: C & ComponentType<P>
): ComponentClass<Omit<P, keyof RouteComponentProps>>;

interface Props extends RouteComponentProps { username: string }

declare const MyComponent: ComponentType<Props>;

withRouter(MyComponent);

// Repro from #33490

type AB<T> = { a: T } | { b: T };

// T & AB<U> normalizes to T & { a: U } | T & { b: U } below
declare function foo<T, U>(obj: T & AB<U>): [T, U];
declare let ab: AB<string>;

let z = foo(ab);  // [AB<string>, string]

// Repro from #51399

declare let a: <T>() => (T extends true ? true : false) & boolean;
declare let b: <T>() => (T extends true ? true : false) & boolean;
a = b;
