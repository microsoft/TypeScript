class C<T> {
    static foo(x: number) { }
    type: T;
}

namespace M {
    export function f(x: typeof C) {   
        return new x<typeof x>();     
    }
}