// tricky interface
interface Settable<T, V> {
    set(value: V): T;
}

// implement
class Identity<V> implements Settable<Identity<V>, V> {
    readonly item: V;
    constructor(value: V) {
        this.item = value;
    }
    public set(value: V): Identity<V> {
        return new Identity<V>(value);
    }
}

// generic parameter default
interface Test1<V, T extends Settable<T, V> = Identity<V>> { };
let test1: Test1<number>;

// not generic parameter default
interface Test2Base<V, T extends Settable<T, V>> { };
type Test2<V> = Test2Base<V, Identity<V>>;
let test2: Test2<number>;
