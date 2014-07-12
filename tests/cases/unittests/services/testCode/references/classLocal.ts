// Local inside a class

var n = 14;

class foo {
    private ^^[|n|] = 0;
    
    public bar() {
        this.[|n|] = 9;
    }
    
    constructor() {
        this.[|n|]^^ = 4;
    }

    public bar2() {
        var n = 12;
    }
}