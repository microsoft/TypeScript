//// [tests/cases/compiler/shadowPrivateMembers.ts] ////

//// [shadowPrivateMembers.ts]
class base { private n() {} }
class derived extends base { private n() {} }


//// [shadowPrivateMembers.js]
class base {
    n() { }
}
class derived extends base {
    n() { }
}
