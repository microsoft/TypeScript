// reference a class static

var n = 43;

class foo {
    static [|n|] = '';
    
    public bar() {
        foo.^^[|n|] = "'";
        if(foo.[|n|]) {
            var x = foo.[|n|];
        }
    }
}

class foo2 {
    private x = foo.[|n|]^^;
    constructor() {
        foo.^^[|n|] = x;
    }

    function b(n) {
        n = foo.[|n|];
    }
}

=================
var q = foo.[|n|];