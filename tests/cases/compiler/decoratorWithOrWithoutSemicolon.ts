// @noemithelpers: true
// @experimentaldecorators: true

function decorated(): Function {
    return (target: any): any => target;
}

class Member { }

class Example {
    @decorated()
    public readonly member: Member;

    @decorated();
    public readonly memberSemicolon: Member;
}
