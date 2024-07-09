namespace A {
    export class B {}
}

// ok
class C1 extends A?.B {}

// error
class C2 implements A?.B {}
