class B {

    constructor() {
        function foo() {  }

        foo();

        var a = 0;
        var inner: any = (function() {
            var CScriptIO = (function() {
                var fso = 0

                return {
                    readFile: function(path: string): string {
                        return fso.toString();
                    }
                }
            })();
            return inner;
        })();
    }
}

var b = new B();

b.foo();



