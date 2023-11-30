// @strict

// Via #56620

class Base<U> { }
export class C2<T> extends Base<unknown> {
    T: number;
    constructor(T: number) {
        super();
        // Should not error
        this.T = T;

        // Should error
        let a: U = null;
    }
}
