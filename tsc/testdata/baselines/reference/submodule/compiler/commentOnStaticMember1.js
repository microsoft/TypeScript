//// [tests/cases/compiler/commentOnStaticMember1.ts] ////

//// [commentOnStaticMember1.ts]
class Greeter {
    //Hello World
    static foo(){
    }
}

//// [commentOnStaticMember1.js]
class Greeter {
    //Hello World
    static foo() {
    }
}
