// @strict: true
// @declaration: true

interface Covariant<T> {
    foo: T extends string ? T : number;
}

interface Contravariant<T> {
    foo: T extends string ? keyof T : number;
}

interface Invariant<T> {
    foo: T extends string ? keyof T : T;
}

interface A { a: string }
interface B extends A { b: string }


function f1(a: Covariant<A>, b: Covariant<B>) {
    a = b;
    b = a;  // Error
}

function f2(a: Contravariant<A>, b: Contravariant<B>) {
    a = b;  // Error
    b = a;
}

function f3(a: Invariant<A>, b: Invariant<B>) {
    a = b;  // Error
    b = a;  // Error
}

// Repros from #22860

export class Option<T> {
    toVector(): Vector<T> {
        return <any>undefined;
    }
}

interface Seq<T> {
    tail(): Option<Seq<T>>;
}

class Vector<T> implements Seq<T> {
    tail(): Option<Vector<T>> {
        return <any>undefined;
    }
    partition2<U extends T>(predicate:(v:T)=>v is U): [Vector<U>,Vector<Exclude<T, U>>];
    partition2(predicate:(x:T)=>boolean): [Vector<T>,Vector<T>];
    partition2<U extends T>(predicate:(v:T)=>boolean): [Vector<U>,Vector<any>] {
        return <any>undefined;
    }
}

interface A1<T> {
    bat: B1<A1<T>>;
}

interface B1<T> extends A1<T> {
    bat: B1<B1<T>>;
    boom: T extends any ? true : true
}
