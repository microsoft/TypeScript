//// [emitClassDeclarationWithLiteralPropertyNameInES6.ts]
class B {
    "hello" = 10;
    0b110 = "world";
    0o23534 = "WORLD";
    20 = "twenty";
    "foo"() { }
    0b1110() {}
    11() { }
    interface() { }
    static "hi" = 10000;
    static 22 = "twenty-two";
    static 0b101 = "binary";
    static 0o3235 = "octal";
}

//// [emitClassDeclarationWithLiteralPropertyNameInES6.js]
class B {
    constructor() {
        this["hello"] = 10;
        this[0b110] = "world";
        this[0o23534] = "WORLD";
        this[20] = "twenty";
    }
    "foo"() { }
    0b1110() { }
    11() { }
    interface() { }
}
B["hi"] = 10000;
B[22] = "twenty-two";
B[0b101] = "binary";
B[0o3235] = "octal";
