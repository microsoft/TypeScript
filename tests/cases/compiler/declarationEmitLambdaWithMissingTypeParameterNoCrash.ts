// @declaration: true
export interface Foo {
    preFetch: <T1 extends T2> (c: T1) => void; // Type T2 is not defined
    preFetcher: new <T1 extends T2> (c: T1) => void; // Type T2 is not defined
}
