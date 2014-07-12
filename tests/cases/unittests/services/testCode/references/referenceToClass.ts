// Class references should work across file and not find local variables
class [|foo|]^^ {
    public n: ^^[|foo|];
    public foo: number;
}

class bar {
    public n: [|f^^o^^o|];
    public k = new [|foo|]();
}

module mod {
    var k: [|foo|] = null;
}

===================
var k: ^^[|foo|];
