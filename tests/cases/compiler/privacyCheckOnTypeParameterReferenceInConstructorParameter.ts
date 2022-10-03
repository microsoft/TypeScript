//@module: amd
//@declaration: true
export class A<T1>{
    constructor(callback: (self: A<T1>) => void) {
        var child = new B(this);
    }
}

export class B<T2> {
    constructor(parent: T2) { }
}
