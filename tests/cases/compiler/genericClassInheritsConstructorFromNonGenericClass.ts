class C {
    constructor(p: string) { }
}
class B<U> extends C { }
class A extends B<string> { }