//// [tests/cases/compiler/staticAsIdentifier.ts] ////

//// [staticAsIdentifier.ts]
class C1 {
    static static
    [x: string]: string;
}

class C2 {
    static static
    m() {}
}

class C3 {
    static static p: string;
}

class C4 {
    static static foo() {}
}

class C5 {
    static static
}

class C6 {
    static 
    static
}

class C7 extends C6 {
    static override static
}




//// [staticAsIdentifier.js]
class C1 {
}
class C2 {
    m() { }
}
class C3 {
}
class C4 {
    foo() { }
}
class C5 {
}
class C6 {
}
class C7 extends C6 {
}
