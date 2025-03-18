//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/typeOfThisInStaticMembers10.ts] ////

//// [typeOfThisInStaticMembers10.ts]
declare const foo: any;

@foo
class C {
    static a = 1;
    static b = this.a + 1;
}

@foo
class D extends C {
    static c = 2;
    static d = this.c + 1;
    static e = super.a + this.c + 1;
    static f = () => this.c + 1;
    static ff = function () { this.c + 1 }
    static foo () {
        return this.c + 1;
    }
    static get fa () {
        return this.c + 1;
    }
    static set fa (v: number) {
        this.c = v + 1;
    }
}

class CC {
    static a = 1;
    static b = this.a + 1;
}

class DD extends CC {
    static c = 2;
    static d = this.c + 1;
    static e = super.a + this.c + 1;
    static f = () => this.c + 1;
    static ff = function () { this.c + 1 }
    static foo () {
        return this.c + 1;
    }
    static get fa () {
        return this.c + 1;
    }
    static set fa (v: number) {
        this.c = v + 1;
    }
}


//// [typeOfThisInStaticMembers10.js]
@foo
class C {
    static a = 1;
    static b = this.a + 1;
}
@foo
class D extends C {
    static c = 2;
    static d = this.c + 1;
    static e = super.a + this.c + 1;
    static f = () => this.c + 1;
    static ff = function () { this.c + 1; };
    static foo() {
        return this.c + 1;
    }
    static get fa() {
        return this.c + 1;
    }
    static set fa(v) {
        this.c = v + 1;
    }
}
class CC {
    static a = 1;
    static b = this.a + 1;
}
class DD extends CC {
    static c = 2;
    static d = this.c + 1;
    static e = super.a + this.c + 1;
    static f = () => this.c + 1;
    static ff = function () { this.c + 1; };
    static foo() {
        return this.c + 1;
    }
    static get fa() {
        return this.c + 1;
    }
    static set fa(v) {
        this.c = v + 1;
    }
}
