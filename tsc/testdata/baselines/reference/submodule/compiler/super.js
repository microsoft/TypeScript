//// [tests/cases/compiler/super.ts] ////

//// [super.ts]
class Base {
    constructor() {
        var x;
    }
    public foo() {
        return "base";
    }

    public bar() {
        return "basebar";
    }
}

class Sub1 extends Base {
    public foo() {
        return "sub1" + super.foo() + super.bar();
    }
}


class SubSub1 extends Sub1 {
    public foo() {
        return "subsub1" + super.foo();
    }
}

class Base2 {
    public foo() {
        super.foo();
    }
}

var s = new Sub1();
var ss = new SubSub1();
s.foo() + ss.foo();



//// [super.js]
class Base {
    constructor() {
        var x;
    }
    foo() {
        return "base";
    }
    bar() {
        return "basebar";
    }
}
class Sub1 extends Base {
    foo() {
        return "sub1" + super.foo() + super.bar();
    }
}
class SubSub1 extends Sub1 {
    foo() {
        return "subsub1" + super.foo();
    }
}
class Base2 {
    foo() {
        super.foo();
    }
}
var s = new Sub1();
var ss = new SubSub1();
s.foo() + ss.foo();
