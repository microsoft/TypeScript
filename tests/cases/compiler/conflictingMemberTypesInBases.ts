interface A {
    m: string;
}
interface B extends A {
}
interface C {
    m: number;
}
interface D extends C {
}

interface E extends B { } // Error here for extending B and D
interface E extends D { } // No duplicate error here
