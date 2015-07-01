//// [parseClassDeclarationInStrictModeByDefaultInES6.ts]
class C {
    interface = 10;
    public implements() { }
    public foo(arguments: any) { }
    private bar(eval:any) {
        arguments = "hello";
    }
}

//// [parseClassDeclarationInStrictModeByDefaultInES6.js]
class C {
    constructor() {
        this.interface = 10;
    }
    implements() { }
    foo(arguments) { }
    bar(eval) {
        arguments = "hello";
    }
}
