//// [tests/cases/compiler/protectedMembersThisParameter.ts] ////

//// [protectedMembersThisParameter.ts]
class Message {
  protected secret(): void {}
}
class MessageWrapper {
  message: Message = new Message();
  wrap<T>() {
    let m = this.message;
    let f = function(this: T) {
      m.secret(); // should error
    }
  }
}

class A {
  protected a() {}
}
class B extends A {
  protected b() {}
}
class C extends A {
  protected c() {}
}
class Z {
  protected z() {}
}

function bA<T extends A>(this: T, arg: B) {
  this.a();
  arg.a();
  arg.b(); // should error to avoid cross-hierarchy protected access https://www.typescriptlang.org/docs/handbook/2/classes.html#cross-hierarchy-protected-access
}
function bB<T extends B>(this: T, arg: B) {
  this.a();
  this.b();
  arg.a();
  arg.b();
}
function bC<T extends C>(this: T, arg: B) {
  this.a();
  this.c();
  arg.a(); // should error
  arg.b(); // should error
}
function bZ<T extends Z>(this: T, arg: B) {
  this.z();
  arg.a(); // should error
  arg.b(); // should error
}
function bString<T extends string>(this: T, arg: B) {
  this.toLowerCase();
  arg.a(); // should error
  arg.b(); // should error
}
function bAny<T>(this: T, arg: B) {
  arg.a(); // should error
  arg.b(); // should error
}

class D {
  protected d() {}

  derived1(arg: D1) {
    arg.d();
    arg.d1(); // should error
  }
  derived1ThisD(this: D, arg: D1) {
    arg.d();
    arg.d1(); // should error
  }
  derived1ThisD1(this: D1, arg: D1) {
    arg.d();
    arg.d1();
  }

  derived2(arg: D2) {
    arg.d(); // should error because of overridden method in D2
    arg.d2(); // should error
  }
  derived2ThisD(this: D, arg: D2) {
    arg.d(); // should error because of overridden method in D2
    arg.d2(); // should error
  }
  derived2ThisD2(this: D2, arg: D2) {
    arg.d();
    arg.d2();
  }
}
class D1 extends D {
  protected d1() {}
}
class D2 extends D {
  protected d() {}
  protected d2() {}
}



//// [protectedMembersThisParameter.js]
class Message {
    secret() { }
}
class MessageWrapper {
    message = new Message();
    wrap() {
        let m = this.message;
        let f = function () {
            m.secret(); // should error
        };
    }
}
class A {
    a() { }
}
class B extends A {
    b() { }
}
class C extends A {
    c() { }
}
class Z {
    z() { }
}
function bA(arg) {
    this.a();
    arg.a();
    arg.b(); // should error to avoid cross-hierarchy protected access https://www.typescriptlang.org/docs/handbook/2/classes.html#cross-hierarchy-protected-access
}
function bB(arg) {
    this.a();
    this.b();
    arg.a();
    arg.b();
}
function bC(arg) {
    this.a();
    this.c();
    arg.a(); // should error
    arg.b(); // should error
}
function bZ(arg) {
    this.z();
    arg.a(); // should error
    arg.b(); // should error
}
function bString(arg) {
    this.toLowerCase();
    arg.a(); // should error
    arg.b(); // should error
}
function bAny(arg) {
    arg.a(); // should error
    arg.b(); // should error
}
class D {
    d() { }
    derived1(arg) {
        arg.d();
        arg.d1(); // should error
    }
    derived1ThisD(arg) {
        arg.d();
        arg.d1(); // should error
    }
    derived1ThisD1(arg) {
        arg.d();
        arg.d1();
    }
    derived2(arg) {
        arg.d(); // should error because of overridden method in D2
        arg.d2(); // should error
    }
    derived2ThisD(arg) {
        arg.d(); // should error because of overridden method in D2
        arg.d2(); // should error
    }
    derived2ThisD2(arg) {
        arg.d();
        arg.d2();
    }
}
class D1 extends D {
    d1() { }
}
class D2 extends D {
    d() { }
    d2() { }
}
