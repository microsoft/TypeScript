//// [decoratorWithOrWithoutSemicolon.ts]
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


//// [decoratorWithOrWithoutSemicolon.js]
function decorated() {
    return function (target) { return target; };
}
var Member = /** @class */ (function () {
    function Member() {
    }
    return Member;
}());
var Example = /** @class */ (function () {
    function Example() {
    }
    __decorate([
        decorated()
    ], Example.prototype, "member");
    __decorate([
        decorated()
    ], Example.prototype, "");
    return Example;
}());
