//super property access in constructor of class with no base type
//super property access in instance member function of class with no base type
//super property access in instance member accessor(get and set) of class with no base type
class NoBase {
    constructor() {
        var a = super.prototype;
        var b = super.hasOwnProperty('');
    }

    fn() {
        var a = super.prototype;
        var b = super.hasOwnProperty('');
    }

    m = super.prototype;
    n = super.hasOwnProperty('');

    //super static property access in static member function of class with no base type
    //super static property access in static member accessor(get and set) of class with no base type
    public static static1() {
        super.hasOwnProperty('');
    }

    public static get static2() {
        super.hasOwnProperty('');
        return '';
    }

    public static set static2(n) {
        super.hasOwnProperty('');
    }
}

class SomeBase {
    private privateFunc() { }
    private privateMember = 0;

    public publicFunc() { }
    public publicMember = 0;

    private static privateStaticFunc() { }
    private static privateStaticMember = 0;

    public static publicStaticFunc() { }
    public static publicStaticMember = 0;

}


//super.publicInstanceMemberNotFunction in constructor of derived class
//super.publicInstanceMemberNotFunction in instance member function of derived class
//super.publicInstanceMemberNotFunction in instance member accessor(get and set) of derived class
//super property access only available with typed this
class SomeDerived1 extends SomeBase {
    constructor() {
        super();
        super.publicMember = 1;
    }

    fn() {
        var x = super.publicMember;
    }

    get a() {
        var x = super.publicMember;
        return undefined;
    }
    set a(n) {
        n = super.publicMember;
    }
    fn2() {
        function inner() {
            super.publicFunc();
        }
        var x = {
            test: function () { return super.publicFunc(); }
        }
    }
}

//super.privateProperty in constructor of derived class
//super.privateProperty in instance member function of derived class
//super.privateProperty in instance member accessor(get and set) of derived class
class SomeDerived2 extends SomeBase {
    constructor() {
        super();
        super.privateMember = 1;
    }

    fn() {
        var x = super.privateMember;
    }

    get a() {
        var x = super.privateMember;
        return undefined;
    }
    set a(n) {
        n = super.privateMember;
    }
}

//super.publicStaticMemberNotFunction in static member function of derived class
//super.publicStaticMemberNotFunction in static member accessor(get and set) of derived class
//super.privateStaticProperty in static member function of derived class
//super.privateStaticProperty in static member accessor(get and set) of derived class
class SomeDerived3 extends SomeBase {
    static fn() {
        super.publicStaticMember = 3;
        super.privateStaticMember = 3;
        super.privateStaticFunc();
    }
    static get a() {
        super.publicStaticMember = 3;
        super.privateStaticMember = 3;
        super.privateStaticFunc();
        return '';
    }
    static set a(n) {
        super.publicStaticMember = 3;
        super.privateStaticMember = 3;
        super.privateStaticFunc();
    }
}

// In object literal
var obj = { n: super.wat, p: super.foo() };
