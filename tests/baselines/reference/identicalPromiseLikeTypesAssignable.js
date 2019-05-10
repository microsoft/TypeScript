//// [identicalPromiseLikeTypesAssignable.ts]
interface P1<T> {
    then<T1>(onfulfilled: (value: T) => T1 | P1<T1>): P1<T1>;
}

interface P2<U> {
    then<T2>(onfulfilled: (value: U) => T2 | P2<T2>): P2<T2>;
}

declare var x: P1<number>;
declare var y: P2<number>;

x = y;
y = x;


//// [identicalPromiseLikeTypesAssignable.js]
x = y;
y = x;
