//// [tests/cases/compiler/instanceSubtypeCheck2.ts] ////

//// [instanceSubtypeCheck2.ts]
class C1<T> {
    x: C2<T>;
}

class C2<T> extends C1<T> {
    x: string
}

//// [instanceSubtypeCheck2.js]
class C1 {
    x;
}
class C2 extends C1 {
    x;
}
