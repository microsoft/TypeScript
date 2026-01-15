//@module: amd
export class A<T1>{
    constructor( public callback: (self: A<T1>) => void) {
        var child = new B(this);
    }
    AAA( callback: (self: A<T1>) => void) {
        var child = new B(this);
    }
}

export interface C<T1>{
    child: B<T1>;
    (self: C<T1>): void;
    new(callback: (self: C<T1>) => void)
}

export class B<T2> {
    constructor(public parent: T2) { }
}

