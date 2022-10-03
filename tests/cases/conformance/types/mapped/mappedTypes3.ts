// @declaration: true

class Box<P> {
    value: P;
}

type Boxified<T> = {
    [K in keyof T]: Box<T[K]>;
}

declare function boxify<T>(obj: T): Boxified<T>;
declare function unboxify<T>(obj: Boxified<T>): T;

interface Bacon {
    isPerfect: boolean;
    weight: number;
}

interface BoxifiedBacon {
    isPerfect: Box<boolean>;
    weight: Box<number>;
}

function f1(b: Bacon) {
    let bb = boxify(b);
    let isPerfect = bb.isPerfect.value;
    let weight = bb.weight.value;
}

function f2(bb: Boxified<Bacon>) {
    let b = unboxify(bb);  // Infer Bacon for T
    let bool = b.isPerfect;
    let weight = b.weight;
}

function f3(bb: BoxifiedBacon) {
    let b = unboxify<Bacon>(bb);  // Explicit type parameter required
    let bool = b.isPerfect;
    let weight = bb.weight;
}