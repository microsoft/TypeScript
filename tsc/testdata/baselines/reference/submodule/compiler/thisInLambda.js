//// [tests/cases/compiler/thisInLambda.ts] ////

//// [thisInLambda.ts]
class Foo {
    x = "hello";
    bar() {
        this.x; // 'this' is type 'Foo'
        var f = () => this.x; // 'this' should be type 'Foo' as well
    }
}

function myFn(a:any) { }
class myCls {
    constructor () {
        myFn(() => {
            myFn(() => {
                var x = this;
            });
        });
    }
}

//// [thisInLambda.js]
class Foo {
    x = "hello";
    bar() {
        this.x; // 'this' is type 'Foo'
        var f = () => this.x; // 'this' should be type 'Foo' as well
    }
}
function myFn(a) { }
class myCls {
    constructor() {
        myFn(() => {
            myFn(() => {
                var x = this;
            });
        });
    }
}
