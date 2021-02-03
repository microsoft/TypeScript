// @strict: true
// @target: es6

class A {
    #foo = "foo";
    #foo = "foo";
}

class A2 {
    #foo = "foo";
    #foo() {}
}


class A3 {
    #foo = "foo";
    get #foo() { return ""}
}

class A4 {
    #foo() { return ""}
    #foo() { return ""}
}


class A5 {
    #foo() { return ""}
    get #foo() { return ""}
}


class A6 {
    #foo = "foo";
    #foo() { return ""}
    get #foo() { return ""}
}

class A7 {
    get #foo() { return ""; }
    get #foo() { return ""; }
}

class A8 {
    set #foo(a: string) {}
    set #foo(a: string) {}
}

class A9 {
    get #foo() { return ""; }
    set #foo(a: string) {}
    get #foo() { return ""; }
    set #foo(a: string) {}
}
