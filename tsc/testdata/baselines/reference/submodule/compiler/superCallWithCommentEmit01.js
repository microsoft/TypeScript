//// [tests/cases/compiler/superCallWithCommentEmit01.ts] ////

//// [superCallWithCommentEmit01.ts]
class A {
    constructor(public text: string) { }
}

class B extends A {
    constructor(text: string) {
        // this is subclass constructor
        super(text)
     }
}

//// [superCallWithCommentEmit01.js]
class A {
    text;
    constructor(text) {
        this.text = text;
    }
}
class B extends A {
    constructor(text) {
        super(text);
    }
}
