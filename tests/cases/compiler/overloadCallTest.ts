class foo {
    constructor() {
        function bar(): string;
        function bar(s:string);
        function bar(foo?: string) { return "foo" };

        var test = bar("test");
        var goo = bar();

        goo = bar("test");
    }
 
}

