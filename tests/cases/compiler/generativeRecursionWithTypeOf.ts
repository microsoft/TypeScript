class C<T> {
    static foo(x: number) { }
    type: T;
}

module M {
    export function f(x: typeof C) {   
        return new x<typeof x>();     
    }
}