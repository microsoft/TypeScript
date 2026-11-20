declare class LocalController<T, U> {
    isLocal: true;
    getProps(a: T, b: U): void;
}
declare class GlobalController<T, U> {
    isLocal: false;
    // N.B.: Parameter type order is reversed
    getProps(a: U, b: T): void;
}

class FailWithTS42 extends LocalController<{ foo: any }, { bar: any }> { }
const p = new FailWithTS42();

declare function createEnhancer1<T, U>(Wrapper: GlobalController<T, U> | LocalController<T, U>): [T, U];
const q1 = createEnhancer1(p);
const q2 = createEnhancer1(p as LocalController<{ foo: any }, { bar: any }>); // structurally identical type to the above
