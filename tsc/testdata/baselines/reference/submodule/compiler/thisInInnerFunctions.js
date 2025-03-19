//// [tests/cases/compiler/thisInInnerFunctions.ts] ////

//// [thisInInnerFunctions.ts]
class Foo {
    x = "hello";
    bar() {
        function inner() {
            this.y = "hi"; // 'this' should be not type to 'Foo' either
            var f = () => this.y;  // 'this' should be not type to 'Foo' either
        }
    }
}

function test() {
    var x = () => {
        (() => this)();
        this;
    };
}


//// [thisInInnerFunctions.js]
class Foo {
    x = "hello";
    bar() {
        function inner() {
            this.y = "hi"; // 'this' should be not type to 'Foo' either
            var f = () => this.y; // 'this' should be not type to 'Foo' either
        }
    }
}
function test() {
    var x = () => {
        (() => this)();
        this;
    };
}
